import type { CreatableUserRole } from '$common/api/users/users.types'

export type CreateUserForm = {
    fullName: string
    email: string
    password: string
    repeatPassword: string
}

export type CreateUserField = keyof CreateUserForm

export type ChangeCreateUserFieldPayload = {
    field: CreateUserField
    value: string
}

export type CreateUserPopoverProps = {
    role: CreatableUserRole
}
