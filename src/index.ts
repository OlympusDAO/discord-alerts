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

import { getClient, getLatestBlock, getSnapshots, Snapshot, SnapshotMap } from "./subgraph";

export interface Env {
  // See binding in wrangler.toml
  RunData: KVNamespace;
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
}

const checkSnapshot = async (kv: KVNamespace, key: string, value: Snapshot): Promise<void> => {
  // Grab the previous data
  const previousRunDataString = await kv.get(key);

  // If no previous data, store
  if (!previousRunDataString) {
    console.info(`No run data found for Bond contract ${key}. Storing.`);
    await kv.put(key, JSON.stringify({
      timestamp: value.timestamp,
      price: value.price,
    }));
    return;
  }
  const previousRunData = JSON.parse(previousRunDataString) as SnapshotRunData;

  // If within bounds, skip
  if (isInBounds(previousRunData, value)) {
    console.info(`Within bounds`);
    return;
  }

  // Otherwise alert in Discord
  console.warn(`Out of bounds`);
}

export default {
  async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
    // Grab the latest block
    const client = getClient("https://api.studio.thegraph.com/query/28103/bonds/0.0.9");
    const latestBlock = await getLatestBlock(client);

    // Grab snapshots at the latest block
    const snapshotMap: SnapshotMap = await getSnapshots(client, latestBlock);

    // Loop through contracts
    for (const [key, value] of snapshotMap) {
      checkSnapshot(env.RunData, key, value);
    }
  }
};