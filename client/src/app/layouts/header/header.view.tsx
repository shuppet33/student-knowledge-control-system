import { Header as AntdHeader } from 'antd/es/layout/layout'

import { reatomComponent } from '@reatom/npm-react'

import { authAtom, PersonalButton } from '$modules/auth'
import { ThemeSwitcher } from '$modules/theme'

import { Nav } from '../nav/nav.view'

import styles from './header.module.css'

export const Header = reatomComponent(({ ctx }) => {
    const { role } = ctx.spy(authAtom)

    return (
        <AntdHeader className={styles.header}>
            <div className={styles.container}>
                {role !== 'guest' && <Nav role={role} />}

                <div className={styles.actions}>
                    <PersonalButton />
                    <ThemeSwitcher />
                </div>
            </div>
        </AntdHeader>
    )
})
