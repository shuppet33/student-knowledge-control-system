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

export const createTeacher = async (payload: {
    fullName: string
    email: string
    password: string
}) => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            role: 'teacher',
            full_name: payload.fullName,
        }),
    })

    if (!response.ok) {
        throw new Error('Ошибка создания преподавателя')
    }

    return await response.json()
}
