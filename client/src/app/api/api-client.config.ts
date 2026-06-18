import type { Ctx } from '@reatom/framework'

import { authAtom } from '$modules/auth'

import { configureApiClient } from '$common/api/api-client.service'
import { refreshSession } from '$common/api/auth/auth.service'
import type { GuestAuth } from '$common/api/auth/auth.types'

const guestAuth: GuestAuth = {
    accessToken: null,
    role: 'guest',
}

export const configureAppApiClient = (ctx: Ctx) => {
    configureApiClient({
        getAccessToken: () => ctx.get(authAtom).accessToken,
        refreshSession: async () => {
            try {
                const auth = await refreshSession()

                authAtom(ctx, auth)

                return auth.accessToken
            } catch {
                authAtom(ctx, guestAuth)

                return null
            }
        },
        onUnauthorized: () => {
            authAtom(ctx, guestAuth)
        },
    })
}
