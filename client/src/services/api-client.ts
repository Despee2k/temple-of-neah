import type { BlockSummary, BlockStatistics, PaginatedResponse, BlockQueryParams, ApiError } from "@/types/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5292/api";

class ApiClient {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`;

		try {
			const response = await fetch(url, {
				...options,
				headers: {
					"Content-Type": "application/json",
					...options?.headers,
				},
			});

			if (!response.ok) {
				const errorText = await response.text();
				const error: ApiError = {
					message: errorText || response.statusText,
					status: response.status,
				};
				throw error;
			}

			// Handle pagination headers if present
			const totalCount = response.headers.get("X-Total-Count");
			const page = response.headers.get("X-Page");
			const pageSize = response.headers.get("X-Page-Size");

			const data = await response.json();

			// If pagination headers exist, return paginated response
			if (totalCount && page && pageSize) {
				return {
					data,
					totalCount: parseInt(totalCount),
					page: parseInt(page),
					pageSize: parseInt(pageSize),
				} as T;
			}

			return data as T;
		} catch (error) {
			if ((error as ApiError).status) {
				throw error;
			}
			throw {
				message: error instanceof Error ? error.message : "Network error",
				status: 0,
				details: error,
			} as ApiError;
		}
	}

	// Block endpoints
	async getBlocks(params?: BlockQueryParams): Promise<PaginatedResponse<BlockSummary>> {
		const queryParams = new URLSearchParams();
		if (params?.page) queryParams.set("page", params.page.toString());
		if (params?.pageSize) queryParams.set("pageSize", params.pageSize.toString());
		if (params?.minSlot) queryParams.set("minSlot", params.minSlot.toString());
		if (params?.maxSlot) queryParams.set("maxSlot", params.maxSlot.toString());
		if (params?.epoch) queryParams.set("epoch", params.epoch.toString());

		const query = queryParams.toString() ? `?${queryParams.toString()}` : "";
		return this.request<PaginatedResponse<BlockSummary>>(`/BlockSummary${query}`);
	}

	async getBlockByHash(blockHash: string): Promise<BlockSummary> {
		return this.request<BlockSummary>(`/BlockSummary/${blockHash}`);
	}

	async getBlockBySlot(slot: number): Promise<BlockSummary> {
		return this.request<BlockSummary>(`/BlockSummary/slot/${slot}`);
	}

	async getBlocksByEpoch(epoch: number): Promise<BlockSummary[]> {
		return this.request<BlockSummary[]>(`/BlockSummary/epoch/${epoch}`);
	}

	async getLatestBlocks(count = 10): Promise<BlockSummary[]> {
		return this.request<BlockSummary[]>(`/BlockSummary/latest?count=${count}`);
	}

	async getStatistics(): Promise<BlockStatistics> {
		return this.request<BlockStatistics>("/BlockSummary/statistics");
	}
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export class for testing or custom instances
export default ApiClient;
