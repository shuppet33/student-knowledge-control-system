export type CreateTeacherForm = {
    fullName: string
    email: string
    password: string
    repeatPassword: string
}

export type CreateTeacherField = keyof CreateTeacherForm

export type ChangeCreateTeacherFieldPayload = {
    field: CreateTeacherField
    value: string
}
