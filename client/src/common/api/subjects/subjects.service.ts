import { API_URL } from '../api.constants'

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
    const response = await fetch(`${API_URL}/subjects`, {
        method: 'GET',
        credentials: 'include',
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
    const response = await fetch(`${API_URL}/subjects`, {
        method: 'POST',
        credentials: 'include',
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
