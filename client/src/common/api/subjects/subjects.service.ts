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
