import { API_URL } from '../api.constants'

import { mapAuthDtoToDomain } from './auth.mapper'
import type { Auth, AuthDto, LoginPayload } from './auth.types'

export const login = async (
    payload: LoginPayload,
): Promise<Auth> => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        throw new Error('Ошибка авторизации')
    }

    const data: AuthDto = await response.json()

    return mapAuthDtoToDomain(data)
}

export const refreshSession = async (): Promise<Auth> => {
    const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
    })

    if (!response.ok) {
        throw new Error('Ошибка обновления сессии')
    }

    const data: AuthDto = await response.json()

    return mapAuthDtoToDomain(data)
}

export const logout = async (): Promise<void> => {
    const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    })

    if (!response.ok) {
        throw new Error('Ошибка выхода из системы')
    }
}
