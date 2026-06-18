import { API_URL } from './api.constants'
import type {
    ApiClientConfig,
    ApiRequestOptions,
} from './api-client.types'
import { createApiError } from './api-error'

let config: ApiClientConfig = {
    getAccessToken: () => null,
    refreshSession: async () => null,
    onUnauthorized: () => undefined,
}

let refreshPromise: Promise<string | null> | null = null

export const configureApiClient = (
    nextConfig: ApiClientConfig,
) => {
    config = nextConfig
}

const createHeaders = (
    options: ApiRequestOptions,
    token: string | null,
) => {
    const headers = new Headers(options.headers)

    if (options.body && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json')
    }

    if (!options.skipAuth && token) {
        headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
}

const sendRequest = (
    path: string,
    options: ApiRequestOptions,
    token: string | null,
) => {
    const requestOptions = { ...options }

    delete requestOptions.skipAuth
    delete requestOptions.skipRefresh

    return fetch(`${API_URL}${path}`, {
        ...requestOptions,
        credentials: 'include',
        headers: createHeaders(options, token),
    })
}

export const apiRequest = async <ResponseData = void>(
    path: string,
    options: ApiRequestOptions = {},
): Promise<ResponseData> => {
    let response = await sendRequest(
        path,
        options,
        config.getAccessToken(),
    )

    if (
        response.status === 401 &&
        !options.skipAuth &&
        !options.skipRefresh
    ) {
        refreshPromise ??= config
            .refreshSession()
            .finally(() => {
                refreshPromise = null
            })

        const accessToken = await refreshPromise.catch(() => null)

        if (accessToken) {
            response = await sendRequest(path, options, accessToken)
        }

        if (!accessToken || response.status === 401) {
            config.onUnauthorized()
        }
    }

    if (!response.ok) {
        throw await createApiError(response)
    }

    const contentType = response.headers.get('Content-Type')

    if (
        response.status === 204 ||
        !contentType?.includes('application/json')
    ) {
        return undefined as ResponseData
    }

    return response.json() as Promise<ResponseData>
}
