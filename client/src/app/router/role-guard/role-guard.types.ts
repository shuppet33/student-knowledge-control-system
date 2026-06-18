import type { ReactNode } from 'react'

import type { AuthenticatedRole } from '$modules/auth'

export type RoleGuardProps = {
    allowedRoles: AuthenticatedRole[]
    children: ReactNode
}
