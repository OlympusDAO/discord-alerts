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

/**
 * Runtime variables
 * - Webhook
 */

const isInBounds = (runData: SnapshotRunData, snapshot: Snapshot): boolean => {
  // TODO
  return false;
};

type SnapshotRunData = {
  timestamp: number;
  price: number;
};

const checkSnapshot = async (kv: KVNamespace, webhookUrl: string, key: string, value: Snapshot): Promise<void> => {
  console.debug(`Checking snapshot for contract ${value.contractAddress}, id ${value.contractId}`);
  // Grab the previous data
  const previousRunDataString = await kv.get(key);

  // If no previous data, store
  if (!previousRunDataString) {
    const runData = JSON.stringify({
      timestamp: value.timestamp,
      price: value.price,
    });
    console.info(`No run data found for Bond contract ${key}. Storing: ${runData}`);
    await kv.put(key, runData);
    return;
  }
  console.info(`Found run data: ${previousRunDataString}`);
  const previousRunData = JSON.parse(previousRunDataString) as SnapshotRunData;

  // If within bounds, skip
  if (isInBounds(previousRunData, value)) {
    console.info(`Within bounds`);
    return;
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
      name: "Previous Price",
      value: previousRunData.price.toString(),
      inline: false,
    },
    {
      name: "Previous Timestamp",
      value: previousRunData.timestamp.toString(),
      inline: true,
    },
  ]);

  // Seconds between
  // Maximum bounds
};

const validateEnvironment = (env: Env): void => {
  console.debug("Validating environment");
  if (!env.WEBHOOK_URL || env.WEBHOOK_URL.length === 0) {
    throw new Error("WEBHOOK_URL secret must be defined");
  }
  if (!env.RunData) {
    throw new Error("RunData must be defined");
  }
  console.debug("Validated");
};

export default {
  async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
    try {
      // Validate environment
      validateEnvironment(env);

      // Grab the latest block
      const client = getClient("https://api.studio.thegraph.com/query/28103/bonds/0.0.9");
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
