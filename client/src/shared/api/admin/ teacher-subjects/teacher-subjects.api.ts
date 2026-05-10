import { API_URL } from '$entities/api'

import { teacherSubjectsMapper } from './teacher-subjects.mapper'
import {
    type TeacherSubject,
    type TeacherSubjectDto,
} from './teacher-subjects.types'

export const getTeacherSubjects = async (
    teacherId: string,
): Promise<TeacherSubject[]> => {
    const response = await fetch(
        `${API_URL}/teachers/${teacherId}/subjects`,
        {
            method: 'GET',
            credentials: 'include',
        },
    )

    if (!response.ok) {
        throw new Error(
            'Ошибка получения предметов преподавателя',
        )
    }

    const data: TeacherSubjectDto[] =
        await response.json()

    return teacherSubjectsMapper(data)
}

export const assignSubjectToTeacher = async (
    teacherId: string,
    subjectId: string,
) => {
    const response = await fetch(
        `${API_URL}/teachers/${teacherId}/subjects`,
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type':
                    'application/json',
            },
            body: JSON.stringify({
                subject_id: subjectId,
            }),
        },
    )

    if (!response.ok) {
        throw new Error(
            'Ошибка назначения предмета',
        )
    }

    return await response.json()
}