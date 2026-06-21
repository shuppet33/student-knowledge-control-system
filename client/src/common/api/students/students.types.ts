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
