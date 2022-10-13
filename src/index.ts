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
  const secondsInterval = snapshot.timestamp - runData.timestamp;
  if (secondsInterval < 0) {
    console.log(
      `Timestamp of previous run (${runData.timestamp}) is greater than the current snapshot (${snapshot.timestamp}), which indicates that subgraph reindexing is happening. Skipping.`,
    );
    return {
      result: true,
    };
  }

  const controlVariableSpeed = 0; // TODO add support for tuning
  // debtDecayIntervalSeconds
  const percentageDecreasePerSecond = 1 / snapshot.debtDecayIntervalSeconds;
  const percentageDecreaseMultiplier = (1 - secondsInterval * percentageDecreasePerSecond) * (1 - controlVariableSpeed);
  // We are fine if the snapshot price is greater than expected
  const minimumPrice = runData.price * percentageDecreaseMultiplier;
  const result = snapshot.price > minimumPrice;
  console.log(`
  seconds: ${secondsInterval}
  percentageDecreasePerSecond: ${percentageDecreasePerSecond}
  percentageDecreaseMultiplier: ${percentageDecreaseMultiplier}
  previous price: ${runData.price}
  previous price floor: ${minimumPrice}
  current price: ${snapshot.price}
  result: ${result}
  `);
  // TODO buffer
  return {
    result: result,
    ...(!result && {
      reason: `Current price of ${snapshot.price} was less than floor of ${minimumPrice}`,
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
      value: `https://etherscan.io/address/${value.contractAddress}`,
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

  // Seconds between
  // Maximum bounds
  // Subgraph data
  // Tuning active

  // Update runData
  await setRunData(kv, key, value);
};

const validateEnvironment = (env: Env): void => {
  console.log("Validating environment");
  if (!env.WEBHOOK_URL || env.WEBHOOK_URL.length === 0) {
    throw new Error("WEBHOOK_URL secret must be defined");
  }
  if (!env.RunData) {
    throw new Error("RunData must be defined");
  }
  console.log("Validated");
};

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
    try {
      // Validate environment
      validateEnvironment(env);

      // Grab the latest block
      const client = getClient("https://api.studio.thegraph.com/query/28103/bonds/0.0.13");
      const latestBlock = await getLatestBlock(client);

      // Grab snapshots at the latest block
      const snapshotMap: SnapshotMap = await getSnapshots(client, latestBlock);

      // Loop through contracts
      for (const [key, value] of snapshotMap) {
        checkSnapshot(env.RunData, env.WEBHOOK_URL, key, value);
      }
    } catch (e: unknown) {
      // TODO handle failure
      console.log(e);
    }
  },
};
