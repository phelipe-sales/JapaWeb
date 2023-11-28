export interface ApiResponse<T> {
    success: boolean,
    data: T,
    errorResult: ErrorResult
}

export interface ErrorResult {
    statusCode: number,
    errorMessages: string[]
}

export interface PagingResult<T>{
    pageIndex: number,
    pageSize: number,
    totalItems: number,
    items: T[]
}