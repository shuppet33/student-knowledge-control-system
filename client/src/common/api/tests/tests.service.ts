import { apiFetch } from '../api.client'

import { testGroupsMapper } from './tests.mapper'
import type {
    AdminTestGroup,
    AdminTestGroupDto,
} from './tests.types'

export const getTests = async (): Promise<AdminTestGroup[]> => {
    const response = await apiFetch('/admin/tests', {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Ошибка получения тестов')
    }

    const data: AdminTestGroupDto[] = await response.json()

    return testGroupsMapper(data)
}

export const deleteTest = async (id: string): Promise<void> => {
    const response = await apiFetch(`/admin/tests/${id}`, {
        method: 'DELETE',
    })

    if (!response.ok) {
        throw new Error('Ошибка удаления теста')
    }
}
