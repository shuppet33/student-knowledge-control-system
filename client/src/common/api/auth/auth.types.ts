export type UserRole = 'guest' | 'student' | 'teacher' | 'admin'
export type AuthenticatedRole = Exclude<UserRole, 'guest'>

export type LoginPayload = {
    email: string
    password: string
}

export type AuthDto = {
    token: string
    role: AuthenticatedRole
}

export type Auth = {
    accessToken: string
    role: AuthenticatedRole
}

export type GuestAuth = {
    accessToken: null
    role: 'guest'
}

export type AuthState = Auth | GuestAuth
