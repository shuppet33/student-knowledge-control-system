import { API_URL } from '../api.constants'

import {
    mapCreateTeacherPayloadToDto,
    teachersMapper,
} from './teachers.mapper'
import type {
    CreateTeacherPayload,
    Teacher,
    TeacherDto,
} from './teachers.types'

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

export const createTeacher = async (
    payload: CreateTeacherPayload,
): Promise<void> => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            mapCreateTeacherPayloadToDto(payload),
        ),
    })

    if (!response.ok) {
        throw new Error('Ошибка создания преподавателя')
    }
}
