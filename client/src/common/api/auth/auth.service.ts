import { apiFetch, setAccessToken } from '../api.client'

import { mapAuthDtoToDomain } from './auth.mapper'
import type { Auth, AuthDto, LoginPayload } from './auth.types'

export const login = async (
    payload: LoginPayload,
): Promise<Auth> => {
    const response = await apiFetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        throw new Error('Ошибка авторизации')
    }

    const data: AuthDto = await response.json()

    setAccessToken(data.token)

    return mapAuthDtoToDomain(data)
}

export const refreshSession = async (): Promise<Auth> => {
    const response = await apiFetch('/auth/refresh', {
        method: 'POST',
    })

    if (!response.ok) {
        setAccessToken(null)
        throw new Error('Ошибка обновления сессии')
    }

    const data: AuthDto = await response.json()

    setAccessToken(data.token)

    return mapAuthDtoToDomain(data)
}

export const logout = async (): Promise<void> => {
    try {
        const response = await apiFetch('/auth/logout', {
            method: 'POST',
        })

        if (!response.ok) {
            throw new Error('Ошибка выхода из системы')
        }
    } finally {
        setAccessToken(null)
    }
}
