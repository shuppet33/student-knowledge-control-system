export type TeacherDto = {
    id: string
    full_name: string
    email: string
}

export type Teacher = {
    id: string
    fullName: string
    email: string
}

export type CreateTeacherPayload = {
    fullName: string
    email: string
    password: string
}

export type CreateTeacherDto = {
    full_name: string
    email: string
    password: string
    role: 'teacher'
}
