import {
    type AssignTeacherSubjectDto,
    type AssignTeacherSubjectPayload,
    type CreateTeacherSubjectDto,
    type CreateTeacherSubjectPayload,
    type TeacherSubject,
    type TeacherSubjectDto,
} from './teacher.types'

export const teacherSubjectMapper = (
    subject: TeacherSubjectDto,
): TeacherSubject => {
    return {
        id: subject.id,
        name: subject.name,
        createdAt: subject.created_at,
    }
}

export const teacherSubjectsMapper = (
    subjects: TeacherSubjectDto[],
): TeacherSubject[] => {
    return subjects.map(teacherSubjectMapper)
}

export const mapAssignTeacherSubjectPayloadToDto = (
    payload: AssignTeacherSubjectPayload,
): AssignTeacherSubjectDto => {
    return {
        subject_id: payload.subjectId,
    }
}

export const mapCreateTeacherSubjectPayloadToDto = (
    payload: CreateTeacherSubjectPayload,
): CreateTeacherSubjectDto => {
    return {
        name: payload.name,
    }
}
