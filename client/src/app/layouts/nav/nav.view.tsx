import { Button } from 'antd'

import { NavLink } from 'react-router'

import { NAV_CONFIG } from './nav.constants'
import type { NavProps } from './nav.types'

import styles from './nav.module.css'

export const Nav = ({ role }: NavProps) => {
    const items = NAV_CONFIG[role]

    return (
        <nav className={styles.nav}>
            {items.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.to === '/admin'}>
                    {({ isActive }) => (
                        <Button type={isActive ? 'primary' : 'default'}>
                            {item.label}
                        </Button>
                    )}
                </NavLink>
            ))}
        </nav>
    )
}
