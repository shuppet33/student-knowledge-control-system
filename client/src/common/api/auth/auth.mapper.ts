import type { Auth, AuthDto } from './auth.types'

export const mapAuthDtoToDomain = (auth: AuthDto): Auth => {
    return {
        accessToken: auth.token,
        role: auth.role,
    }
}
