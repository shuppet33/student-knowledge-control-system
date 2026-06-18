import {
    type CreateSubjectDto,
    type CreateSubjectPayload,
    type Subject,
    type SubjectDto,
} from './subjects.types'

export const subjectMapper = (
    subject: SubjectDto,
): Subject => {
    return {
        id: subject.id,
        name: subject.name,
        createdAt: subject.created_at,
    }
}

export const subjectsMapper = (
    subjects: SubjectDto[],
): Subject[] => {
    return subjects.map(subjectMapper)
}

export const mapCreateSubjectPayloadToDto = (
    payload: CreateSubjectPayload,
): CreateSubjectDto => {
    return {
        name: payload.name,
    }
}
