export interface ApiResponse<T> {
    success: boolean,
    data: T,
    errorResult: ErrorResult
}

export interface ErrorResult {
    statusCode: number,
    errorMessage: string[]
}