import { Client, createClient } from "@urql/core";

import { BondSnapshotsLatestBlockQueryDocument, BondSnapshotsQueryDocument } from "./generated/graphql-operations";

export const getClient = (url: string): Client => {
  return createClient({
    url: url,
  });
};

export const getLatestBlock = async (client: Client): Promise<number> => {
  console.debug("Fetching latest block");
  const query = await client.query(BondSnapshotsLatestBlockQueryDocument, {}).toPromise();

  if (!query.data || query.data.bondSnapshots.length === 0) {
    throw new Error("Unable to determine latest block");
  }

  const latestBlock = query.data.bondSnapshots[0].block;
  console.info(`Latest block is ${latestBlock}`);
  return latestBlock;
};

// We define our own type, as we do not need all of the fields in BondSnapshot
export type Snapshot = {
  id: string;
  date: string;
  timestamp: number;
  contractAddress: string;
  contractId: number;
  price: number; // BigNumber?
  debtDecayIntervalSeconds: number;
};

export type SnapshotMap = Map<string, Snapshot>;

export const getSnapshots = async (client: Client, block: number): Promise<SnapshotMap> => {
  console.debug("Fetching snapshots at latest block");
  const query = await client.query(BondSnapshotsQueryDocument, { block: block }).toPromise();

  if (!query.data) {
    throw new Error("Unable to obtain snapshots");
  }

  const results = query.data.bondSnapshots;
  console.info(`Received ${results.length} records`);

  // Extract the snapshots into the map
  const snapshotsMap = new Map<string, Snapshot>();
  results.forEach(value => {
    const snapshotMapId = `${value.contractAddress}/${value.contractId}`;

    // For each block, there should only be one permutation of contractAddress and contractId, so be defensive.
    if (snapshotsMap.has(snapshotMapId)) {
      throw new Error(`Did not expect to find existing value for snapshot map id ${snapshotMapId}`);
    }

    const compatibleValue: Snapshot = {
      ...value,
      contractAddress: value.contractAddress.toString(),
    };

    snapshotsMap.set(snapshotMapId, compatibleValue);
  });

  return snapshotsMap;
};
