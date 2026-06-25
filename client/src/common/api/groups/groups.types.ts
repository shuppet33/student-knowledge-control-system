export type GroupDto = {
    id: string
    name: string
}

export type Group = {
    id: string
    name: string
}

export type AddStudentsToGroupDto = {
    student_ids: string[]
}

export type AddStudentsToGroupPayload = {
    studentIds: string[]
}
