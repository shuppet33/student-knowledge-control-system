import type { ApiErrorPayload } from './api-error.types'

export class ApiError extends Error {
    public readonly status: number
    public readonly payload?: unknown

    constructor(
        message: string,
        status: number,
        payload?: unknown,
    ) {
        super(message)
        this.name = 'ApiError'
        this.status = status
        this.payload = payload
    }
}

export const createApiError = async (
    response: Response,
): Promise<ApiError> => {
    let payload: ApiErrorPayload | undefined

    try {
        payload = await response.clone().json()
    } catch {
        payload = undefined
    }

    return new ApiError(
        payload?.message ??
            payload?.error ??
            response.statusText ??
            'Ошибка API',
        response.status,
        payload,
    )
}
