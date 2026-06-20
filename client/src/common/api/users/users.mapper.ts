import type {
    CreateUserDto,
    CreateUserPayload,
} from './users.types'

export const mapCreateUserPayloadToDto = (
    payload: CreateUserPayload,
): CreateUserDto => {
    return {
        full_name: payload.fullName,
        email: payload.email,
        password: payload.password,
        role: payload.role,
    }
}
