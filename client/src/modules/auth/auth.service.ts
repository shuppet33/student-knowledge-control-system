import {
    reatomAsync,
    reatomResource,
    withErrorAtom,
    withStatusesAtom,
} from '@reatom/framework'

import { login, logout, refreshSession } from '$common/api/auth/auth.service'
import type { GuestAuth } from '$common/api/auth/auth.types'

import { authAtom } from './auth.state'

const guestAuth: GuestAuth = {
    accessToken: null,
    role: 'guest',
}

export const loginAsync = reatomAsync(
    async (ctx, email: string, password: string) => {
        const auth = await login({ email, password })

        authAtom(ctx, auth)

        return auth
    },
).pipe(withErrorAtom(), withStatusesAtom())

export const sessionResource = reatomResource(async (ctx) => {
    try {
        const auth = await refreshSession()

        authAtom(ctx, auth)

        return auth
    } catch {
        authAtom(ctx, guestAuth)

        return guestAuth
    }
}, 'sessionResource').pipe(withStatusesAtom())

export const logoutAsync = reatomAsync(async (ctx) => {
    try {
        await logout()
    } finally {
        authAtom(ctx, guestAuth)
    }
}).pipe(withStatusesAtom())
