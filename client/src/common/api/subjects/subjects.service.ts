import { apiFetch } from '../api.client'

import {
    mapCreateSubjectPayloadToDto,
    subjectMapper,
    subjectsMapper,
} from './subjects.mapper'
import type {
    CreateSubjectPayload,
    Subject,
    SubjectDto,
} from './subjects.types'

export const getSubjects = async (): Promise<Subject[]> => {
    const response = await apiFetch('/admin/subjects', {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Ошибка получения предметов')
    }

    const data: SubjectDto[] = await response.json()

    return subjectsMapper(data)
}

export const getSubject = async (id: string): Promise<Subject> => {
    const response = await apiFetch(`/admin/subjects/${id}`)

    if (!response.ok) {
        throw new Error('Ошибка получения предмета')
    }

    const data: SubjectDto = await response.json()

    return subjectMapper(data)
}

export const updateSubjectName = async (
    id: string,
    name: string,
): Promise<Subject> => {
    const response = await apiFetch(`/admin/subjects/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    })

    if (!response.ok) {
        throw new Error('Ошибка обновления предмета')
    }

    const data: SubjectDto = await response.json()

    return subjectMapper(data)
}

export const createSubject = async (
    payload: CreateSubjectPayload,
): Promise<Subject> => {
    const response = await apiFetch('/admin/subjects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            mapCreateSubjectPayloadToDto(payload),
        ),
    })

    if (!response.ok) {
        throw new Error('Ошибка создания предмета')
    }

    const data: SubjectDto = await response.json()

    return subjectMapper(data)
}

export const deleteSubject = async (id: string): Promise<void> => {
    const response = await apiFetch(`/admin/subjects/${id}`, {
        method: 'DELETE',
    })

    if (!response.ok) {
        throw new Error('Ошибка удаления предмета')
    }
}
