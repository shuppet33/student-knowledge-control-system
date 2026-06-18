import { API_ROUTES } from '../api.constants'
import { apiRequest } from '../api-client.service'

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
    const data = await apiRequest<TeacherDto[]>(
        API_ROUTES.teachers,
    )

    return teachersMapper(data)
}

export const createTeacher = async (
    payload: CreateTeacherPayload,
): Promise<void> => {
    await apiRequest(API_ROUTES.users, {
        method: 'POST',
        body: JSON.stringify(
            mapCreateTeacherPayloadToDto(payload),
        ),
    })
}
