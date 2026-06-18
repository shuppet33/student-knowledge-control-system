import { API_ROUTES } from '../api.constants'
import { apiRequest } from '../api-client.service'

import {
    mapAssignSubjectPayloadToDto,
    teacherSubjectsMapper,
} from './teacher-subjects.mapper'
import type {
    AssignSubjectPayload,
    TeacherSubject,
    TeacherSubjectDto,
} from './teacher-subjects.types'

export const getTeacherSubjects = async (
    teacherId: string,
): Promise<TeacherSubject[]> => {
    const data = await apiRequest<TeacherSubjectDto[]>(
        API_ROUTES.teacherSubjects(teacherId),
    )

    return teacherSubjectsMapper(data)
}

export const assignSubjectToTeacher = async (
    teacherId: string,
    payload: AssignSubjectPayload,
): Promise<void> => {
    await apiRequest(
        API_ROUTES.teacherSubjects(teacherId),
        {
            method: 'POST',
            body: JSON.stringify(
                mapAssignSubjectPayloadToDto(payload),
            ),
        },
    )
}
