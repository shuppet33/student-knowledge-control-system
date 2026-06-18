export type ApiClientConfig = {
    getAccessToken: () => string | null
    refreshSession: () => Promise<string | null>
    onUnauthorized: () => void
}

export type ApiRequestOptions = RequestInit & {
    skipAuth?: boolean
    skipRefresh?: boolean
}
