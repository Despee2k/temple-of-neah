// API Response Types matching backend models

export interface BlockSummary {
	blockHash: string;
	slot: number;
	epoch: number;
	height: number;
	previousBlockHash: string | null;
	txCount: number;
	inputCount: number;
	outputCount: number;
	uniqueAddressCount: number;
	totalFees: number;
	totalAdaMoved: number;
	totalLovelaceMoved: number;
	mintCount: number;
	burnCount: number;
	timestamp: string | null;
}

export interface BlockStatistics {
	totalBlocks: number;
	latestBlock: BlockSummary | null;
	latestEpoch: number;
	totalTransactions: number;
	totalAdaMoved: number;
	averageTxPerBlock: number;
}

export interface PaginatedResponse<T> {
	data: T[];
	totalCount: number;
	page: number;
	pageSize: number;
}

export interface ApiError {
	message: string;
	status: number;
	details?: unknown;
}

// Query parameters for block endpoints
export interface BlockQueryParams {
	page?: number;
	pageSize?: number;
	minSlot?: number;
	maxSlot?: number;
	epoch?: number;
}
