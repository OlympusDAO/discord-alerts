import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: number;
  BigInt: number;
  Bytes: Uint8Array;
};

export type BlockChangedFilter = {
  number_gte: Scalars["Int"];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars["Bytes"]>;
  number?: InputMaybe<Scalars["Int"]>;
  number_gte?: InputMaybe<Scalars["Int"]>;
};

export type BondSnapshot = {
  __typename?: "BondSnapshot";
  block: Scalars["BigInt"];
  capacity: Scalars["BigDecimal"];
  contractAddress: Scalars["Bytes"];
  contractId: Scalars["BigInt"];
  date: Scalars["String"];
  debtDecayIntervalSeconds: Scalars["BigInt"];
  depositIntervalSeconds: Scalars["BigInt"];
  id: Scalars["ID"];
  isLive: Scalars["Boolean"];
  lastDecayDate: Scalars["String"];
  lastDecaySecondsAgo: Scalars["BigInt"];
  lastDecayTimestamp: Scalars["BigInt"];
  lastTuneDate: Scalars["String"];
  lastTuneDebt: Scalars["BigDecimal"];
  lastTuneSecondsAgo: Scalars["BigInt"];
  lastTuneTimestamp: Scalars["BigInt"];
  maxPayout: Scalars["BigDecimal"];
  minPrice: Scalars["BigDecimal"];
  nextDecayDate: Scalars["String"];
  nextDecayInSeconds: Scalars["BigInt"];
  nextTuneDate: Scalars["String"];
  nextTuneInSeconds: Scalars["BigInt"];
  owner: Scalars["Bytes"];
  payoutToken: Scalars["Bytes"];
  price: Scalars["BigDecimal"];
  purchased: Scalars["BigDecimal"];
  quoteToken: Scalars["Bytes"];
  sold: Scalars["BigDecimal"];
  timestamp: Scalars["BigInt"];
  totalDebt: Scalars["BigDecimal"];
  tuneAdjustmentDelaySeconds: Scalars["BigInt"];
  tuneBelowCapacity: Scalars["BigDecimal"];
  tuneIntervalCapacity: Scalars["BigDecimal"];
  tuneIntervalSeconds: Scalars["BigInt"];
};

export type BondSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  block?: InputMaybe<Scalars["BigInt"]>;
  block_gt?: InputMaybe<Scalars["BigInt"]>;
  block_gte?: InputMaybe<Scalars["BigInt"]>;
  block_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  block_lt?: InputMaybe<Scalars["BigInt"]>;
  block_lte?: InputMaybe<Scalars["BigInt"]>;
  block_not?: InputMaybe<Scalars["BigInt"]>;
  block_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  capacity?: InputMaybe<Scalars["BigDecimal"]>;
  capacity_gt?: InputMaybe<Scalars["BigDecimal"]>;
  capacity_gte?: InputMaybe<Scalars["BigDecimal"]>;
  capacity_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  capacity_lt?: InputMaybe<Scalars["BigDecimal"]>;
  capacity_lte?: InputMaybe<Scalars["BigDecimal"]>;
  capacity_not?: InputMaybe<Scalars["BigDecimal"]>;
  capacity_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  contractAddress?: InputMaybe<Scalars["Bytes"]>;
  contractAddress_contains?: InputMaybe<Scalars["Bytes"]>;
  contractAddress_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  contractAddress_not?: InputMaybe<Scalars["Bytes"]>;
  contractAddress_not_contains?: InputMaybe<Scalars["Bytes"]>;
  contractAddress_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  contractId?: InputMaybe<Scalars["BigInt"]>;
  contractId_gt?: InputMaybe<Scalars["BigInt"]>;
  contractId_gte?: InputMaybe<Scalars["BigInt"]>;
  contractId_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  contractId_lt?: InputMaybe<Scalars["BigInt"]>;
  contractId_lte?: InputMaybe<Scalars["BigInt"]>;
  contractId_not?: InputMaybe<Scalars["BigInt"]>;
  contractId_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  date?: InputMaybe<Scalars["String"]>;
  date_contains?: InputMaybe<Scalars["String"]>;
  date_contains_nocase?: InputMaybe<Scalars["String"]>;
  date_ends_with?: InputMaybe<Scalars["String"]>;
  date_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  date_gt?: InputMaybe<Scalars["String"]>;
  date_gte?: InputMaybe<Scalars["String"]>;
  date_in?: InputMaybe<Array<Scalars["String"]>>;
  date_lt?: InputMaybe<Scalars["String"]>;
  date_lte?: InputMaybe<Scalars["String"]>;
  date_not?: InputMaybe<Scalars["String"]>;
  date_not_contains?: InputMaybe<Scalars["String"]>;
  date_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  date_not_ends_with?: InputMaybe<Scalars["String"]>;
  date_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  date_not_in?: InputMaybe<Array<Scalars["String"]>>;
  date_not_starts_with?: InputMaybe<Scalars["String"]>;
  date_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  date_starts_with?: InputMaybe<Scalars["String"]>;
  date_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  debtDecayIntervalSeconds?: InputMaybe<Scalars["BigInt"]>;
  debtDecayIntervalSeconds_gt?: InputMaybe<Scalars["BigInt"]>;
  debtDecayIntervalSeconds_gte?: InputMaybe<Scalars["BigInt"]>;
  debtDecayIntervalSeconds_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  debtDecayIntervalSeconds_lt?: InputMaybe<Scalars["BigInt"]>;
  debtDecayIntervalSeconds_lte?: InputMaybe<Scalars["BigInt"]>;
  debtDecayIntervalSeconds_not?: InputMaybe<Scalars["BigInt"]>;
  debtDecayIntervalSeconds_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  depositIntervalSeconds?: InputMaybe<Scalars["BigInt"]>;
  depositIntervalSeconds_gt?: InputMaybe<Scalars["BigInt"]>;
  depositIntervalSeconds_gte?: InputMaybe<Scalars["BigInt"]>;
  depositIntervalSeconds_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  depositIntervalSeconds_lt?: InputMaybe<Scalars["BigInt"]>;
  depositIntervalSeconds_lte?: InputMaybe<Scalars["BigInt"]>;
  depositIntervalSeconds_not?: InputMaybe<Scalars["BigInt"]>;
  depositIntervalSeconds_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  isLive?: InputMaybe<Scalars["Boolean"]>;
  isLive_in?: InputMaybe<Array<Scalars["Boolean"]>>;
  isLive_not?: InputMaybe<Scalars["Boolean"]>;
  isLive_not_in?: InputMaybe<Array<Scalars["Boolean"]>>;
  lastDecayDate?: InputMaybe<Scalars["String"]>;
  lastDecayDate_contains?: InputMaybe<Scalars["String"]>;
  lastDecayDate_contains_nocase?: InputMaybe<Scalars["String"]>;
  lastDecayDate_ends_with?: InputMaybe<Scalars["String"]>;
  lastDecayDate_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  lastDecayDate_gt?: InputMaybe<Scalars["String"]>;
  lastDecayDate_gte?: InputMaybe<Scalars["String"]>;
  lastDecayDate_in?: InputMaybe<Array<Scalars["String"]>>;
  lastDecayDate_lt?: InputMaybe<Scalars["String"]>;
  lastDecayDate_lte?: InputMaybe<Scalars["String"]>;
  lastDecayDate_not?: InputMaybe<Scalars["String"]>;
  lastDecayDate_not_contains?: InputMaybe<Scalars["String"]>;
  lastDecayDate_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  lastDecayDate_not_ends_with?: InputMaybe<Scalars["String"]>;
  lastDecayDate_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  lastDecayDate_not_in?: InputMaybe<Array<Scalars["String"]>>;
  lastDecayDate_not_starts_with?: InputMaybe<Scalars["String"]>;
  lastDecayDate_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  lastDecayDate_starts_with?: InputMaybe<Scalars["String"]>;
  lastDecayDate_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  lastDecaySecondsAgo?: InputMaybe<Scalars["BigInt"]>;
  lastDecaySecondsAgo_gt?: InputMaybe<Scalars["BigInt"]>;
  lastDecaySecondsAgo_gte?: InputMaybe<Scalars["BigInt"]>;
  lastDecaySecondsAgo_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  lastDecaySecondsAgo_lt?: InputMaybe<Scalars["BigInt"]>;
  lastDecaySecondsAgo_lte?: InputMaybe<Scalars["BigInt"]>;
  lastDecaySecondsAgo_not?: InputMaybe<Scalars["BigInt"]>;
  lastDecaySecondsAgo_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  lastDecayTimestamp?: InputMaybe<Scalars["BigInt"]>;
  lastDecayTimestamp_gt?: InputMaybe<Scalars["BigInt"]>;
  lastDecayTimestamp_gte?: InputMaybe<Scalars["BigInt"]>;
  lastDecayTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  lastDecayTimestamp_lt?: InputMaybe<Scalars["BigInt"]>;
  lastDecayTimestamp_lte?: InputMaybe<Scalars["BigInt"]>;
  lastDecayTimestamp_not?: InputMaybe<Scalars["BigInt"]>;
  lastDecayTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  lastTuneDate?: InputMaybe<Scalars["String"]>;
  lastTuneDate_contains?: InputMaybe<Scalars["String"]>;
  lastTuneDate_contains_nocase?: InputMaybe<Scalars["String"]>;
  lastTuneDate_ends_with?: InputMaybe<Scalars["String"]>;
  lastTuneDate_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  lastTuneDate_gt?: InputMaybe<Scalars["String"]>;
  lastTuneDate_gte?: InputMaybe<Scalars["String"]>;
  lastTuneDate_in?: InputMaybe<Array<Scalars["String"]>>;
  lastTuneDate_lt?: InputMaybe<Scalars["String"]>;
  lastTuneDate_lte?: InputMaybe<Scalars["String"]>;
  lastTuneDate_not?: InputMaybe<Scalars["String"]>;
  lastTuneDate_not_contains?: InputMaybe<Scalars["String"]>;
  lastTuneDate_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  lastTuneDate_not_ends_with?: InputMaybe<Scalars["String"]>;
  lastTuneDate_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  lastTuneDate_not_in?: InputMaybe<Array<Scalars["String"]>>;
  lastTuneDate_not_starts_with?: InputMaybe<Scalars["String"]>;
  lastTuneDate_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  lastTuneDate_starts_with?: InputMaybe<Scalars["String"]>;
  lastTuneDate_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  lastTuneDebt?: InputMaybe<Scalars["BigDecimal"]>;
  lastTuneDebt_gt?: InputMaybe<Scalars["BigDecimal"]>;
  lastTuneDebt_gte?: InputMaybe<Scalars["BigDecimal"]>;
  lastTuneDebt_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  lastTuneDebt_lt?: InputMaybe<Scalars["BigDecimal"]>;
  lastTuneDebt_lte?: InputMaybe<Scalars["BigDecimal"]>;
  lastTuneDebt_not?: InputMaybe<Scalars["BigDecimal"]>;
  lastTuneDebt_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  lastTuneSecondsAgo?: InputMaybe<Scalars["BigInt"]>;
  lastTuneSecondsAgo_gt?: InputMaybe<Scalars["BigInt"]>;
  lastTuneSecondsAgo_gte?: InputMaybe<Scalars["BigInt"]>;
  lastTuneSecondsAgo_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  lastTuneSecondsAgo_lt?: InputMaybe<Scalars["BigInt"]>;
  lastTuneSecondsAgo_lte?: InputMaybe<Scalars["BigInt"]>;
  lastTuneSecondsAgo_not?: InputMaybe<Scalars["BigInt"]>;
  lastTuneSecondsAgo_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  lastTuneTimestamp?: InputMaybe<Scalars["BigInt"]>;
  lastTuneTimestamp_gt?: InputMaybe<Scalars["BigInt"]>;
  lastTuneTimestamp_gte?: InputMaybe<Scalars["BigInt"]>;
  lastTuneTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  lastTuneTimestamp_lt?: InputMaybe<Scalars["BigInt"]>;
  lastTuneTimestamp_lte?: InputMaybe<Scalars["BigInt"]>;
  lastTuneTimestamp_not?: InputMaybe<Scalars["BigInt"]>;
  lastTuneTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  maxPayout?: InputMaybe<Scalars["BigDecimal"]>;
  maxPayout_gt?: InputMaybe<Scalars["BigDecimal"]>;
  maxPayout_gte?: InputMaybe<Scalars["BigDecimal"]>;
  maxPayout_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  maxPayout_lt?: InputMaybe<Scalars["BigDecimal"]>;
  maxPayout_lte?: InputMaybe<Scalars["BigDecimal"]>;
  maxPayout_not?: InputMaybe<Scalars["BigDecimal"]>;
  maxPayout_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  minPrice?: InputMaybe<Scalars["BigDecimal"]>;
  minPrice_gt?: InputMaybe<Scalars["BigDecimal"]>;
  minPrice_gte?: InputMaybe<Scalars["BigDecimal"]>;
  minPrice_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  minPrice_lt?: InputMaybe<Scalars["BigDecimal"]>;
  minPrice_lte?: InputMaybe<Scalars["BigDecimal"]>;
  minPrice_not?: InputMaybe<Scalars["BigDecimal"]>;
  minPrice_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  nextDecayDate?: InputMaybe<Scalars["String"]>;
  nextDecayDate_contains?: InputMaybe<Scalars["String"]>;
  nextDecayDate_contains_nocase?: InputMaybe<Scalars["String"]>;
  nextDecayDate_ends_with?: InputMaybe<Scalars["String"]>;
  nextDecayDate_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  nextDecayDate_gt?: InputMaybe<Scalars["String"]>;
  nextDecayDate_gte?: InputMaybe<Scalars["String"]>;
  nextDecayDate_in?: InputMaybe<Array<Scalars["String"]>>;
  nextDecayDate_lt?: InputMaybe<Scalars["String"]>;
  nextDecayDate_lte?: InputMaybe<Scalars["String"]>;
  nextDecayDate_not?: InputMaybe<Scalars["String"]>;
  nextDecayDate_not_contains?: InputMaybe<Scalars["String"]>;
  nextDecayDate_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  nextDecayDate_not_ends_with?: InputMaybe<Scalars["String"]>;
  nextDecayDate_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  nextDecayDate_not_in?: InputMaybe<Array<Scalars["String"]>>;
  nextDecayDate_not_starts_with?: InputMaybe<Scalars["String"]>;
  nextDecayDate_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  nextDecayDate_starts_with?: InputMaybe<Scalars["String"]>;
  nextDecayDate_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  nextDecayInSeconds?: InputMaybe<Scalars["BigInt"]>;
  nextDecayInSeconds_gt?: InputMaybe<Scalars["BigInt"]>;
  nextDecayInSeconds_gte?: InputMaybe<Scalars["BigInt"]>;
  nextDecayInSeconds_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  nextDecayInSeconds_lt?: InputMaybe<Scalars["BigInt"]>;
  nextDecayInSeconds_lte?: InputMaybe<Scalars["BigInt"]>;
  nextDecayInSeconds_not?: InputMaybe<Scalars["BigInt"]>;
  nextDecayInSeconds_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  nextTuneDate?: InputMaybe<Scalars["String"]>;
  nextTuneDate_contains?: InputMaybe<Scalars["String"]>;
  nextTuneDate_contains_nocase?: InputMaybe<Scalars["String"]>;
  nextTuneDate_ends_with?: InputMaybe<Scalars["String"]>;
  nextTuneDate_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  nextTuneDate_gt?: InputMaybe<Scalars["String"]>;
  nextTuneDate_gte?: InputMaybe<Scalars["String"]>;
  nextTuneDate_in?: InputMaybe<Array<Scalars["String"]>>;
  nextTuneDate_lt?: InputMaybe<Scalars["String"]>;
  nextTuneDate_lte?: InputMaybe<Scalars["String"]>;
  nextTuneDate_not?: InputMaybe<Scalars["String"]>;
  nextTuneDate_not_contains?: InputMaybe<Scalars["String"]>;
  nextTuneDate_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  nextTuneDate_not_ends_with?: InputMaybe<Scalars["String"]>;
  nextTuneDate_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  nextTuneDate_not_in?: InputMaybe<Array<Scalars["String"]>>;
  nextTuneDate_not_starts_with?: InputMaybe<Scalars["String"]>;
  nextTuneDate_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  nextTuneDate_starts_with?: InputMaybe<Scalars["String"]>;
  nextTuneDate_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  nextTuneInSeconds?: InputMaybe<Scalars["BigInt"]>;
  nextTuneInSeconds_gt?: InputMaybe<Scalars["BigInt"]>;
  nextTuneInSeconds_gte?: InputMaybe<Scalars["BigInt"]>;
  nextTuneInSeconds_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  nextTuneInSeconds_lt?: InputMaybe<Scalars["BigInt"]>;
  nextTuneInSeconds_lte?: InputMaybe<Scalars["BigInt"]>;
  nextTuneInSeconds_not?: InputMaybe<Scalars["BigInt"]>;
  nextTuneInSeconds_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  owner?: InputMaybe<Scalars["Bytes"]>;
  owner_contains?: InputMaybe<Scalars["Bytes"]>;
  owner_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  owner_not?: InputMaybe<Scalars["Bytes"]>;
  owner_not_contains?: InputMaybe<Scalars["Bytes"]>;
  owner_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  payoutToken?: InputMaybe<Scalars["Bytes"]>;
  payoutToken_contains?: InputMaybe<Scalars["Bytes"]>;
  payoutToken_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  payoutToken_not?: InputMaybe<Scalars["Bytes"]>;
  payoutToken_not_contains?: InputMaybe<Scalars["Bytes"]>;
  payoutToken_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  price?: InputMaybe<Scalars["BigDecimal"]>;
  price_gt?: InputMaybe<Scalars["BigDecimal"]>;
  price_gte?: InputMaybe<Scalars["BigDecimal"]>;
  price_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  price_lt?: InputMaybe<Scalars["BigDecimal"]>;
  price_lte?: InputMaybe<Scalars["BigDecimal"]>;
  price_not?: InputMaybe<Scalars["BigDecimal"]>;
  price_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  purchased?: InputMaybe<Scalars["BigDecimal"]>;
  purchased_gt?: InputMaybe<Scalars["BigDecimal"]>;
  purchased_gte?: InputMaybe<Scalars["BigDecimal"]>;
  purchased_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  purchased_lt?: InputMaybe<Scalars["BigDecimal"]>;
  purchased_lte?: InputMaybe<Scalars["BigDecimal"]>;
  purchased_not?: InputMaybe<Scalars["BigDecimal"]>;
  purchased_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  quoteToken?: InputMaybe<Scalars["Bytes"]>;
  quoteToken_contains?: InputMaybe<Scalars["Bytes"]>;
  quoteToken_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  quoteToken_not?: InputMaybe<Scalars["Bytes"]>;
  quoteToken_not_contains?: InputMaybe<Scalars["Bytes"]>;
  quoteToken_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  sold?: InputMaybe<Scalars["BigDecimal"]>;
  sold_gt?: InputMaybe<Scalars["BigDecimal"]>;
  sold_gte?: InputMaybe<Scalars["BigDecimal"]>;
  sold_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  sold_lt?: InputMaybe<Scalars["BigDecimal"]>;
  sold_lte?: InputMaybe<Scalars["BigDecimal"]>;
  sold_not?: InputMaybe<Scalars["BigDecimal"]>;
  sold_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  totalDebt?: InputMaybe<Scalars["BigDecimal"]>;
  totalDebt_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalDebt_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalDebt_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalDebt_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalDebt_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalDebt_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalDebt_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  tuneAdjustmentDelaySeconds?: InputMaybe<Scalars["BigInt"]>;
  tuneAdjustmentDelaySeconds_gt?: InputMaybe<Scalars["BigInt"]>;
  tuneAdjustmentDelaySeconds_gte?: InputMaybe<Scalars["BigInt"]>;
  tuneAdjustmentDelaySeconds_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  tuneAdjustmentDelaySeconds_lt?: InputMaybe<Scalars["BigInt"]>;
  tuneAdjustmentDelaySeconds_lte?: InputMaybe<Scalars["BigInt"]>;
  tuneAdjustmentDelaySeconds_not?: InputMaybe<Scalars["BigInt"]>;
  tuneAdjustmentDelaySeconds_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  tuneBelowCapacity?: InputMaybe<Scalars["BigDecimal"]>;
  tuneBelowCapacity_gt?: InputMaybe<Scalars["BigDecimal"]>;
  tuneBelowCapacity_gte?: InputMaybe<Scalars["BigDecimal"]>;
  tuneBelowCapacity_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  tuneBelowCapacity_lt?: InputMaybe<Scalars["BigDecimal"]>;
  tuneBelowCapacity_lte?: InputMaybe<Scalars["BigDecimal"]>;
  tuneBelowCapacity_not?: InputMaybe<Scalars["BigDecimal"]>;
  tuneBelowCapacity_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  tuneIntervalCapacity?: InputMaybe<Scalars["BigDecimal"]>;
  tuneIntervalCapacity_gt?: InputMaybe<Scalars["BigDecimal"]>;
  tuneIntervalCapacity_gte?: InputMaybe<Scalars["BigDecimal"]>;
  tuneIntervalCapacity_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  tuneIntervalCapacity_lt?: InputMaybe<Scalars["BigDecimal"]>;
  tuneIntervalCapacity_lte?: InputMaybe<Scalars["BigDecimal"]>;
  tuneIntervalCapacity_not?: InputMaybe<Scalars["BigDecimal"]>;
  tuneIntervalCapacity_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  tuneIntervalSeconds?: InputMaybe<Scalars["BigInt"]>;
  tuneIntervalSeconds_gt?: InputMaybe<Scalars["BigInt"]>;
  tuneIntervalSeconds_gte?: InputMaybe<Scalars["BigInt"]>;
  tuneIntervalSeconds_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  tuneIntervalSeconds_lt?: InputMaybe<Scalars["BigInt"]>;
  tuneIntervalSeconds_lte?: InputMaybe<Scalars["BigInt"]>;
  tuneIntervalSeconds_not?: InputMaybe<Scalars["BigInt"]>;
  tuneIntervalSeconds_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
};

export enum BondSnapshot_OrderBy {
  Block = "block",
  Capacity = "capacity",
  ContractAddress = "contractAddress",
  ContractId = "contractId",
  Date = "date",
  DebtDecayIntervalSeconds = "debtDecayIntervalSeconds",
  DepositIntervalSeconds = "depositIntervalSeconds",
  Id = "id",
  IsLive = "isLive",
  LastDecayDate = "lastDecayDate",
  LastDecaySecondsAgo = "lastDecaySecondsAgo",
  LastDecayTimestamp = "lastDecayTimestamp",
  LastTuneDate = "lastTuneDate",
  LastTuneDebt = "lastTuneDebt",
  LastTuneSecondsAgo = "lastTuneSecondsAgo",
  LastTuneTimestamp = "lastTuneTimestamp",
  MaxPayout = "maxPayout",
  MinPrice = "minPrice",
  NextDecayDate = "nextDecayDate",
  NextDecayInSeconds = "nextDecayInSeconds",
  NextTuneDate = "nextTuneDate",
  NextTuneInSeconds = "nextTuneInSeconds",
  Owner = "owner",
  PayoutToken = "payoutToken",
  Price = "price",
  Purchased = "purchased",
  QuoteToken = "quoteToken",
  Sold = "sold",
  Timestamp = "timestamp",
  TotalDebt = "totalDebt",
  TuneAdjustmentDelaySeconds = "tuneAdjustmentDelaySeconds",
  TuneBelowCapacity = "tuneBelowCapacity",
  TuneIntervalCapacity = "tuneIntervalCapacity",
  TuneIntervalSeconds = "tuneIntervalSeconds",
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

export type Query = {
  __typename?: "Query";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bondSnapshot?: Maybe<BondSnapshot>;
  bondSnapshots: Array<BondSnapshot>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryBondSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBondSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<BondSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BondSnapshot_Filter>;
};

export type Subscription = {
  __typename?: "Subscription";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bondSnapshot?: Maybe<BondSnapshot>;
  bondSnapshots: Array<BondSnapshot>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionBondSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionBondSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<BondSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BondSnapshot_Filter>;
};

export type _Block_ = {
  __typename?: "_Block_";
  /** The hash of the block */
  hash?: Maybe<Scalars["Bytes"]>;
  /** The block number */
  number: Scalars["Int"];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars["Int"]>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: "_Meta_";
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars["String"];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars["Boolean"];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = "allow",
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = "deny",
}

export type BondSnapshotsLatestBlockQueryQueryVariables = Exact<{ [key: string]: never }>;

export type BondSnapshotsLatestBlockQueryQuery = {
  __typename?: "Query";
  bondSnapshots: Array<{ __typename?: "BondSnapshot"; block: number }>;
};

export type BondSnapshotsQueryQueryVariables = Exact<{
  block: Scalars["BigInt"];
}>;

export type BondSnapshotsQueryQuery = {
  __typename?: "Query";
  bondSnapshots: Array<{
    __typename?: "BondSnapshot";
    id: string;
    date: string;
    timestamp: number;
    contractAddress: Uint8Array;
    contractId: number;
    price: number;
    debtDecayIntervalSeconds: number;
  }>;
};

export const BondSnapshotsLatestBlockQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "BondSnapshotsLatestBlockQuery" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "bondSnapshots" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "block" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "desc" },
              },
              { kind: "Argument", name: { kind: "Name", value: "first" }, value: { kind: "IntValue", value: "1" } },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "block" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BondSnapshotsLatestBlockQueryQuery, BondSnapshotsLatestBlockQueryQueryVariables>;
export const BondSnapshotsQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "BondSnapshotsQuery" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "block" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "BigInt" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "bondSnapshots" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "block" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "desc" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "block" },
                      value: { kind: "Variable", name: { kind: "Name", value: "block" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "isLive" },
                      value: { kind: "BooleanValue", value: true },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "date" } },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
                { kind: "Field", name: { kind: "Name", value: "contractAddress" } },
                { kind: "Field", name: { kind: "Name", value: "contractId" } },
                { kind: "Field", name: { kind: "Name", value: "price" } },
                { kind: "Field", name: { kind: "Name", value: "debtDecayIntervalSeconds" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BondSnapshotsQueryQuery, BondSnapshotsQueryQueryVariables>;
