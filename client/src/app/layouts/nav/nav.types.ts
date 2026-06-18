import type { AuthenticatedRole } from '$modules/auth'

export type NavItem = {
    label: string
    to: string
}

export type NavConfig = Record<AuthenticatedRole, NavItem[]>

export type NavProps = {
    role: AuthenticatedRole
}
