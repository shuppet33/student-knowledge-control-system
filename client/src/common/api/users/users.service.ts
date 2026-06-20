import { apiFetch } from '../api.client'

import { mapCreateUserPayloadToDto } from './users.mapper'
import type { CreateUserPayload } from './users.types'

export const createUser = async (
    payload: CreateUserPayload,
): Promise<void> => {
    const response = await apiFetch('/admin/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mapCreateUserPayloadToDto(payload)),
    })

    if (!response.ok) {
        throw new Error('Ошибка создания пользователя')
    }
}
