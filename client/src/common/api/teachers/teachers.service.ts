import { apiFetch } from '../api.client'

import { teachersMapper } from './teachers.mapper'
import type { Teacher, TeacherDto } from './teachers.types'

export const getTeachers = async (): Promise<Teacher[]> => {
    const response = await apiFetch('/admin/teachers', {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Ошибка получения преподавателей')
    }

    const data: TeacherDto[] = await response.json()

    return teachersMapper(data)
}
