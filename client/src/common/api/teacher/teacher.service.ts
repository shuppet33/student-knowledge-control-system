import { apiFetch } from '../api.client'
import type { Group } from '../groups/groups.types'

import {
    mapAssignTeacherSubjectPayloadToDto,
    mapCreateTeacherSubjectPayloadToDto,
    teacherSubjectMapper,
    teacherSubjectsMapper,
} from './teacher.mapper'
import type {
    AssignTeacherSubjectPayload,
    CreateTeacherSubjectPayload,
    TeacherSubject,
    TeacherSubjectDto,
} from './teacher.types'

export const getMyTeacherSubjects = async (): Promise<TeacherSubject[]> => {
    const response = await apiFetch('/teacher/subjects', {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Ошибка получения предметов преподавателя')
    }

    const data: TeacherSubjectDto[] = await response.json()

    return teacherSubjectsMapper(data)
}

export const getTeacherAvailableSubjects = async (): Promise<TeacherSubject[]> => {
    const response = await apiFetch('/teacher/subjects/all', {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Ошибка получения предметов')
    }

    const data: TeacherSubjectDto[] = await response.json()

    return teacherSubjectsMapper(data)
}

export const getMyTeacherSubject = async (
    subjectId: string,
): Promise<TeacherSubject> => {
    const response = await apiFetch(`/teacher/subjects/${subjectId}`, {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Ошибка получения предмета')
    }

    const data: TeacherSubjectDto = await response.json()

    return teacherSubjectMapper(data)
}

export const updateMyTeacherSubjectName = async (
    subjectId: string,
    name: string,
): Promise<TeacherSubject> => {
    const response = await apiFetch(`/teacher/subjects/${subjectId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    })

    if (!response.ok) {
        throw new Error('Ошибка обновления предмета')
    }

    const data: TeacherSubjectDto = await response.json()

    return teacherSubjectMapper(data)
}

export const getTeacherGroups = async (): Promise<Group[]> => {
    const response = await apiFetch('/teacher/groups', {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Ошибка получения групп')
    }

    return await response.json()
}

export const getMyTeacherSubjectGroups = async (
    subjectId: string,
): Promise<Group[]> => {
    const response = await apiFetch(`/teacher/subjects/${subjectId}/groups`, {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Ошибка получения групп предмета')
    }

    return await response.json()
}

export const addMyTeacherSubjectToGroup = async (
    groupId: string,
    subjectId: string,
): Promise<void> => {
    const response = await apiFetch(`/teacher/groups/${groupId}/subjects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject_id: subjectId }),
    })

    if (!response.ok) {
        throw new Error('Ошибка добавления группы к предмету')
    }
}

export const removeMyTeacherSubjectFromGroup = async (
    groupId: string,
    subjectId: string,
): Promise<void> => {
    const response = await apiFetch(
        `/teacher/groups/${groupId}/subjects/${subjectId}`,
        {
            method: 'DELETE',
        },
    )

    if (!response.ok) {
        throw new Error('Ошибка удаления группы из предмета')
    }
}

export const assignSubjectToMe = async (
    payload: AssignTeacherSubjectPayload,
): Promise<void> => {
    const response = await apiFetch('/teacher/subjects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            mapAssignTeacherSubjectPayloadToDto(payload),
        ),
    })

    if (!response.ok) {
        throw new Error('Ошибка назначения предмета')
    }
}

export const createSubjectAndAssignToMe = async (
    payload: CreateTeacherSubjectPayload,
): Promise<TeacherSubject> => {
    const response = await apiFetch('/teacher/subjects/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            mapCreateTeacherSubjectPayloadToDto(payload),
        ),
    })

    if (!response.ok) {
        throw new Error('Ошибка создания предмета')
    }

    const data: TeacherSubjectDto = await response.json()

    return teacherSubjectMapper(data)
}
