import { API_ROUTES } from '../api.constants'
import { apiRequest } from '../api-client.service'

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
    const data = await apiRequest<SubjectDto[]>(
        API_ROUTES.subjects,
    )

    return subjectsMapper(data)
}

export const createSubject = async (
    payload: CreateSubjectPayload,
): Promise<Subject> => {
    const data = await apiRequest<SubjectDto>(
        API_ROUTES.subjects,
        {
            method: 'POST',
            body: JSON.stringify(
                mapCreateSubjectPayloadToDto(payload),
            ),
        },
    )

    return subjectMapper(data)
}
