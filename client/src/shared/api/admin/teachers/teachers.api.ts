import { API_URL } from '$entities/api.ts'

import { teachersMapper } from './teachers.mapper'
import { type Teacher, type TeacherDto } from './teachers.types'

export const getTeachers = async (): Promise<Teacher[]> => {
    const response = await fetch(`${API_URL}/teachers`, {
        method: 'GET',
        credentials: 'include',
    })

    if (!response.ok) {
        throw new Error('Ошибка получения преподавателей')
    }

    const data: TeacherDto[] = await response.json()

    return teachersMapper(data)
}