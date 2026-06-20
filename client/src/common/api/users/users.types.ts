export type CreatableUserRole = 'teacher' | 'student'

export type CreateUserPayload = {
    fullName: string
    email: string
    password: string
    role: CreatableUserRole
}

export type CreateUserDto = {
    full_name: string
    email: string
    password: string
    role: CreatableUserRole
}
