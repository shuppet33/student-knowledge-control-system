import { apiFetch } from '../api.client'

import type { Group } from './groups.types'

export const getGroups = async (): Promise<Group[]> => {
    const response = await apiFetch('/admin/groups')

    if (!response.ok) {
        throw new Error('Ошибка получения групп')
    }

    return await response.json()
}

export const createGroup = async (name: string): Promise<Group> => {
    const response = await apiFetch(`/admin/groups`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    })

    if (!response.ok) {
        throw new Error('Ошибка создания группы')
    }

    return await response.json()
}

export const addSubjectToGroup = async (groupId: string, subjectId: string): Promise<void> => {
    const response = await apiFetch(`/admin/groups/${groupId}/subjects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject_id: subjectId }),
    })

    if (!response.ok) {
        throw new Error('Ошибка добавления группы к предмету')
    }
}

export const removeSubjectFromGroup = async (groupId: string, subjectId: string): Promise<void> => {
    const response = await apiFetch(`/admin/groups/${groupId}/subjects/${subjectId}`, {
        method: 'DELETE',
    })

    if (!response.ok) {
        throw new Error('Ошибка удаления группы из предмета')
    }
}
