import { apiFetch } from '../api.client'

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
    const response = await apiFetch('/admin/teachers', {
        method: 'GET',
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
    const response = await apiFetch('/admin/users', {
        method: 'POST',
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
