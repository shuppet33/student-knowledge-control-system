import { API_URL } from './api.constants'

let accessToken: string | null = null

export const setAccessToken = (token: string | null): void => {
    accessToken = token
}

export const apiFetch = (
    path: string,
    options: RequestInit = {},
): Promise<Response> => {
    const headers = new Headers(options.headers)

    if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`)
    }

    return fetch(`${API_URL}${path}`, {
        ...options,
        credentials: 'include',
        headers,
    })
}
