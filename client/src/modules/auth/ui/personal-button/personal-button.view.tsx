import { Button } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { useNavigate } from 'react-router'

import { logoutAsync } from '$modules/auth'
import { authAtom } from '$modules/auth'

import styles from './personal-button.module.css'

export const PersonalButton = reatomComponent(({ ctx }) => {
    const { role } = ctx.spy(authAtom)
    const navigate = useNavigate()

    const logout = async () => {
        try {
            await logoutAsync(ctx)
        } finally {
            navigate('/', { replace: true })
        }
    }

    return (
        <div className={styles.wrapper}>
            <span>{role}</span>

            <Button
                loading={ctx.spy(logoutAsync.statusesAtom).isPending}
                onClick={logout}
            >
                выйти
            </Button>
        </div>
    )
})
