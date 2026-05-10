import {
    type Subject,
    type SubjectDto,
} from './subjects.types'

export const subjectsMapper = (
    subjects: SubjectDto[],
): Subject[] => {
    return subjects.map((subject) => ({
        id: subject.id,
        name: subject.name,
        createdAt: subject.created_at,
    }))
}