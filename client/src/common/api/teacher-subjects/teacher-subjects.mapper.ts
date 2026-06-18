import {
    type AssignSubjectDto,
    type AssignSubjectPayload,
    type TeacherSubject,
    type TeacherSubjectDto,
} from './teacher-subjects.types'

export const teacherSubjectsMapper = (
    subjects: TeacherSubjectDto[],
): TeacherSubject[] => {
    return subjects.map((subject) => ({
        id: subject.id,
        name: subject.name,
        createdAt: subject.created_at,
    }))
}

export const mapAssignSubjectPayloadToDto = (
    payload: AssignSubjectPayload,
): AssignSubjectDto => {
    return {
        subject_id: payload.subjectId,
    }
}
