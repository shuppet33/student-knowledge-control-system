import type { AuthDto } from '$common/api/auth/auth.types'

export const authFixture: AuthDto = {
    token: 'mock-access-token',
    role: 'admin',
}
