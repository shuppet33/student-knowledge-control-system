import { apiFetch } from '../api.client'

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
    const response = await apiFetch(
        `/admin/teachers/${teacherId}/subjects`,
        {
            method: 'GET',
        },
    )

    if (!response.ok) {
        throw new Error(
            'Ошибка получения предметов преподавателя',
        )
    }

    const data: TeacherSubjectDto[] = await response.json()

    return teacherSubjectsMapper(data)
}

export const assignSubjectToTeacher = async (
    teacherId: string,
    payload: AssignSubjectPayload,
): Promise<void> => {
    const response = await apiFetch(
        `/admin/teachers/${teacherId}/subjects`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                mapAssignSubjectPayloadToDto(payload),
            ),
        },
    )

    if (!response.ok) {
        throw new Error('Ошибка назначения предмета')
    }
}

export const deleteTeacherSubject = async (
    teacherId: string,
    subjectId: string,
): Promise<void> => {
    const response = await apiFetch(
        `/admin/teachers/${teacherId}/subjects/${subjectId}`,
        {
            method: 'DELETE',
        },
    )

    if (!response.ok) {
        throw new Error(
            'Ошибка удаления предмета у преподавателя',
        )
    }
}
