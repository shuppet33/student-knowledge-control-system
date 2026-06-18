import { reatomComponent } from '@reatom/npm-react'

import type { FC } from 'react'
import { Navigate } from 'react-router'

import { authAtom, sessionResource } from '$modules/auth'

import type { RoleGuardProps } from './role-guard.types'

export const RoleGuard: FC<RoleGuardProps> = reatomComponent(
    ({ ctx, allowedRoles, children }) => {
        const { accessToken, role } = ctx.spy(authAtom)
        const { isEverSettled, isPending } = ctx.spy(
            sessionResource.statusesAtom,
        )

        if (!isEverSettled || isPending) {
            return <div>loading...</div>
        }

        if (role === 'guest' || accessToken === null) {
            return <Navigate to="/" replace />
        }

        if (!allowedRoles.includes(role)) {
            return <Navigate to={`/${role}`} replace />
        }

        return children
    },
)
