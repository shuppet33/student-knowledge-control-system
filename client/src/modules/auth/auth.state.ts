import { atom } from '@reatom/framework'

import type { AuthState } from '$common/api/auth/auth.types'

export const authAtom = atom<AuthState>({
    accessToken: null,
    role: 'guest',
})
