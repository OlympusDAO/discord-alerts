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
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

/**
 * Runtime variables
 * - Webhook
 */

const isInBounds = (previousSnapshot: Snapshot, snapshot: Snapshot): boolean => {
	return false;
}

export default {
	async scheduled(
		controller: ScheduledController,
		env: Env,
		ctx: ExecutionContext
	): Promise<void> {
		// Grab the latest block
		const client = getClient("https://api.studio.thegraph.com/query/28103/bonds/0.0.9");
		const latestBlock = await getLatestBlock(client);

		// Grab snapshots at the latest block
		const snapshotMap: SnapshotMap = await getSnapshots(client, latestBlock);

		// Loop through contracts
		snapshotMap.forEach((value, key) => {
			console.log(`snapshot = ${JSON.stringify(value)}`);
			// Grab the previous data
			const existingSnapshot = null;

			// If no previous data, store

			// If within bounds, skip

			// Otherwise alert in Discord
		});
	},
};
