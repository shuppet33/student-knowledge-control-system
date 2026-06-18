import { API_ROUTES } from '../api.constants'
import { apiRequest } from '../api-client.service'

import { mapAuthDtoToDomain } from './auth.mapper'
import type { Auth, AuthDto, LoginPayload } from './auth.types'

export const login = async (
    payload: LoginPayload,
): Promise<Auth> => {
    const data = await apiRequest<AuthDto>(
        API_ROUTES.auth.login,
        {
            method: 'POST',
            body: JSON.stringify(payload),
            skipAuth: true,
            skipRefresh: true,
        },
    )

    return mapAuthDtoToDomain(data)
}

export const refreshSession = async (): Promise<Auth> => {
    const data = await apiRequest<AuthDto>(
        API_ROUTES.auth.refresh,
        {
            method: 'POST',
            skipAuth: true,
            skipRefresh: true,
        },
    )

    return mapAuthDtoToDomain(data)
}

export const logout = async (): Promise<void> => {
    await apiRequest(API_ROUTES.auth.logout, {
        method: 'POST',
        skipRefresh: true,
    })
}
