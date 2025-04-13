export interface PaginationRequest {
    pageNumber: number;
    pageSize: number;
    searchTerm?: string;
}

export interface PaginationResponse<T> {
    data: T[];
    total: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}
