/**
 * Welcome to Cloudflare Workers! This is your first scheduled worker.
 *
 * - Run `wrangler dev --local` in your terminal to start a development server
 * - Run `curl "http://localhost:8787/cdn-cgi/mf/scheduled"` to trigger the scheduled event
 * - Go back to the console to see what your worker has logged
 * - Update the Cron trigger in wrangler.toml (see https://developers.cloudflare.com/workers/wrangler/configuration/#triggers)
 * - Run `wrangler publish --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/runtime-apis/scheduled-event/
 */

import { sendAlert } from "./discord";
import { getClient, getLatestBlock, getSnapshots, Snapshot, SnapshotMap } from "./subgraph";

export interface Env {
  // See binding in wrangler.toml
  RunData: KVNamespace;
  WEBHOOK_URL: string;
}

type BoundsResult = {
  result: boolean;
  reason?: string;
};

const isInBounds = (runData: SnapshotRunData, snapshot: Snapshot): BoundsResult => {
  const secondsElapsed = snapshot.timestamp - runData.timestamp;
  if (secondsElapsed < 0) {
    console.log(
      `Timestamp of previous run (${runData.timestamp}) is greater than the current snapshot (${snapshot.timestamp}), which indicates that subgraph reindexing is happening. Skipping.`,
    );
    return {
      result: true,
    };
  }

  /**
   * In case the check runs after a long time, we need to use the minimum of the respective interval settings
   * and the seconds between checks.
   */
  const debtDecaySecondsElapsed = Math.min(snapshot.debtDecayIntervalSeconds, secondsElapsed);
  const tuneSecondsElapsed = Math.min(snapshot.tuneAdjustmentDelaySeconds, secondsElapsed);

  /**
   * The control variable (related to periodic tuning)
   */
  const controlVariableSpeed =
    // No tuning, therefore no controlVariable, so speed is 0
    snapshot.controlVariable === 0 || snapshot.previousControlVariable === 0
      ? 0
      : // We only care if the controlVariable is decreasing
      snapshot.controlVariable > snapshot.previousControlVariable
      ? 0
      : // Rate of change of the controlVariable
        (snapshot.previousControlVariable - snapshot.controlVariable) / snapshot.previousControlVariable;
  const controlVariableSpeedPerSecond = controlVariableSpeed / snapshot.tuneAdjustmentDelaySeconds;

  /**
   * The debt decay
   */
  const debtDecayPerSecond = 1 / snapshot.debtDecayIntervalSeconds;

  /**
   * Calculate the minimum price that we expect
   */
  const BUFFER = 0.0025;
  const percentageDecreaseMultiplier =
    (1 - debtDecaySecondsElapsed * debtDecayPerSecond) * (1 - tuneSecondsElapsed * controlVariableSpeedPerSecond);
  const percentageDecreaseMultiplierWithBuffer = (1 - BUFFER) * percentageDecreaseMultiplier;
  const minimumPrice = runData.price * percentageDecreaseMultiplierWithBuffer;

  // We are fine if the snapshot price is greater than the minimum
  const result = snapshot.price > minimumPrice;

  return {
    result: result,
    ...(!result && {
      reason: `Current price of ${snapshot.price} less than the floor.
      
      Previous price: ${runData.price}
      
      Multiplier: ${percentageDecreaseMultiplier}

      Buffer: ${(BUFFER * 100).toFixed(2)}%
      
      Floor: ${minimumPrice}`,
    }),
  };
};

type SnapshotRunData = {
  timestamp: number;
  price: number;
};

const setRunData = async (kv: KVNamespace, key: string, snapshot: Snapshot): Promise<void> => {
  const runData = JSON.stringify({
    timestamp: snapshot.timestamp,
    price: snapshot.price,
  });
  await kv.put(key, runData);
  console.log(`Stored runData: ${runData}`);
};

const checkSnapshot = async (kv: KVNamespace, webhookUrl: string, key: string, value: Snapshot): Promise<void> => {
  console.log(`Checking snapshot for contract ${value.contractAddress}, id ${value.contractId}`);
  // Grab the previous data
  const previousRunDataString = await kv.get(key);

  // If no previous data, store
  if (!previousRunDataString) {
    console.log(`No run data found for Bond contract ${key}.`);
    await setRunData(kv, key, value);
    return;
  }
  console.log(`Found run data: ${previousRunDataString}`);
  const previousRunData = JSON.parse(previousRunDataString) as SnapshotRunData;

  // If within bounds, skip
  const boundsResult = isInBounds(previousRunData, value);
  if (boundsResult.result === true) {
    console.log(`Within bounds`);
    await setRunData(kv, key, value);
    return;
  }

  // Sanity-check
  if (boundsResult.reason === undefined) {
    throw new Error("boundsResult was true, but reason was not set");
  }

  // Otherwise alert in Discord
  console.warn(`Out of bounds`);
  await sendAlert(webhookUrl, `🚨 Bonds`, `Bond price ${value.price} is out of bounds.`, [
    {
      name: "Contract",
      value: `https://etherscan.io/address/${value.contractAddress}#readContract`,
      inline: false,
    },
    {
      name: "ID",
      value: value.contractId.toString(),
      inline: false,
    },
    {
      name: "Date",
      value: value.date,
      inline: false,
    },
    {
      name: "Reason",
      value: boundsResult.reason,
      inline: false,
    },
  ]);

  // Update runData
  await setRunData(kv, key, value);
};

const validateEnvironment = (): void => {
  console.log("Validating environment");
  if (!WEBHOOK_URL || WEBHOOK_URL.length === 0) {
    throw new Error("WEBHOOK_URL secret must be defined");
  }
  if (!RunData) {
    throw new Error("RunData must be defined");
  }
  console.log("Validated");
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handler(request: Request): Promise<Response> {
  try {
    // Validate environment
    validateEnvironment();

    // Grab the latest block
    const client = getClient("https://api.thegraph.com/subgraphs/name/olympusdao/bonds");
    const latestBlock = await getLatestBlock(client);

    // Grab snapshots at the latest block
    const snapshotMap: SnapshotMap = await getSnapshots(client, latestBlock);

    // Loop through contracts
    for (const [key, value] of snapshotMap) {
      await checkSnapshot(RunData, WEBHOOK_URL, key, value);
    }

    console.log("Done with check");

    return new Response(null, {
      status: 200,
      statusText: "Success",
    });
  } catch (e: unknown) {
    console.log("Encountered unexpected error:");
    console.log(e);

    return new Response(null, {
      status: 500,
      statusText: e instanceof Error ? e.message : "Unknown type",
    });
  }
}

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handler(event.request));
});
