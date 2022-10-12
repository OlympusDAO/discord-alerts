import { gql } from "@urql/core";

const BondSnapshotsLatestBlockQuery = gql`
    query {
        bondSnapshots(orderBy: block, orderDirection: desc, first: 1) {
            block
        }
    }
`;

const BondSnapshotsQuery = gql`
    query ($block: String!) {
        bondSnapshots(orderBy: block, orderDirection: desc, where: {block: $block}) {
            id
            date
            timestamp
            contractAddress
            contractId
            price
            debtDecayIntervalSeconds
        }
    }
`;

export const getLatestBlock = (): number => {
    return -1;
}

export type Snapshot = {
    id: string;
    date: string;
    timestamp: number;
    contractAddress: string;
    contractId: string;
    price: string; // BigNumber?
    debtDecayIntervalSeconds: number;
}

export type SnapshotMap = {
    [contractAddress: string]: {
        [contractId: string]: Snapshot;
    }
}

export const getSnapshots = (block: number): SnapshotMap => {
    return {};
}