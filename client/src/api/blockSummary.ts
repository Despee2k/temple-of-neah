import api from "./axios";

export interface BlockSummary {
  blockHash: string;
  slot: number;
  epoch: number;
  height: number;
  previousBlockHash: string;
  txCount: number;
  inputCount: number;
  outputCount: number;
  uniqueAddressCount: number;
  totalFees: number;
  totalAdaMoved: number;
  totalLovelaceMoved: number;
  mintCount: number;
  burnCount: number;
  timestamp: string;
}

export interface GetBlockSummariesParams {
  page?: number;
  pageSize?: number;
  minSlot?: number;
  maxSlot?: number;
  epoch?: number;
}

export type BlockSummaryMetric = "ada" | string;

export interface GetBlockSummaryAggregateLastDaysParams {
  days?: number;
  metric?: BlockSummaryMetric;
}

// GET /api/BlockSummary
export async function getBlockSummaries(params: GetBlockSummariesParams = {}) {
  const response = await api.get<BlockSummary[]>("/api/BlockSummary", {
    params,
  });
  return response.data;
}

// GET /api/BlockSummary/{blockHash}
export async function getBlockSummaryByHash(blockHash: string) {
  const response = await api.get<BlockSummary>(
    `/api/BlockSummary/${encodeURIComponent(blockHash)}`
  );
  return response.data;
}

// GET /api/BlockSummary/slot/{slot}
export async function getBlockSummaryBySlot(slot: number) {
  const response = await api.get<BlockSummary>(
    `/api/BlockSummary/slot/${encodeURIComponent(String(slot))}`
  );
  return response.data;
}

// GET /api/BlockSummary/epoch/{epoch}
export async function getBlockSummariesByEpoch(epoch: number) {
  const response = await api.get<BlockSummary[]>(
    `/api/BlockSummary/epoch/${encodeURIComponent(String(epoch))}`
  );
  return response.data;
}

// GET /api/BlockSummary/latest
export async function getLatestBlockSummaries(count?: number) {
  const response = await api.get<BlockSummary[]>("/api/BlockSummary/latest", {
    params: count != null ? { count } : undefined,
  });
  return response.data;
}

// GET /api/BlockSummary/statistics
export async function getBlockSummaryStatistics<T = unknown>() {
  const response = await api.get<T>("/api/BlockSummary/statistics");
  return response.data;
}

// GET /api/BlockSummary/aggregate/last-days
export async function getBlockSummaryAggregateLastDays<T = unknown>(
  params: GetBlockSummaryAggregateLastDaysParams = {}
) {
  const response = await api.get<T>("/api/BlockSummary/aggregate/last-days", {
    params,
  });
  return response.data;
}


