export type StudentDto = {
    id: string
    full_name: string
    email: string
    created_at: string
}

export type Student = {
    id: string
    fullName: string
    email: string
    createdAt: string
}

export type StudentGroupDto = {
    group_id: string | null
    group_name: string
    students: StudentDto[]
}

export type StudentGroup = {
    groupId: string | null
    groupName: string
    students: Student[]
}

export type SearchStudentsDto = {
    search: string
    excluded_group_id: string
    limit: number
}

export type SearchStudentsPayload = {
    search: string
    excludedGroupId: string
    limit?: number
}

export type StudentSubjectDto = {
    id: string,
    name: string
}

export type StudentSubject = {
    id: string,
    name: string
}

export type StudentTestDto = {
    id: string
    title: string
    questions_count: number
    answers_count: number
    score: number | null
    date_of_appointment: string
}

export type StudentTest = {
    id: string
    title: string
    metrics: {
        from: number
        to: number
    }
    score: number | null
    dateOfAppointment: string
}

export type StudentSubjectTestsDto = {
    subject: StudentSubjectDto
    tests: StudentTestDto[]
}

export type StudentSubjectTests = {
    subject: StudentSubject
    tests: StudentTest[]
}