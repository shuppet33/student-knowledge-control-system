export type TeacherSubjectDto = {
    id: string
    name: string
    created_at: string | null
}

export type TeacherSubject = {
    id: string
    name: string
    createdAt: string | null
}

export type AssignTeacherSubjectPayload = {
    subjectId: string
}

export type AssignTeacherSubjectDto = {
    subject_id: string
}

export type CreateTeacherSubjectPayload = {
    name: string
}

export type CreateTeacherSubjectDto = {
    name: string
}
