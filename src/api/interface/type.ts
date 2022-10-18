export interface IResponseData<T> {
    status: number
    message: string
    data?: T | null
}
