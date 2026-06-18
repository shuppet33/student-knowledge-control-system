import { Button } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { useNavigate } from 'react-router'

import { logoutAsync } from '../../auth.service'
import { authAtom } from '../../auth.state'

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
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span>{role}</span>

            <Button
                loading={ctx.spy(logoutAsync.statusesAtom).isPending}
                onClick={logout}
            >
                Выйти
            </Button>
        </div>
    )
})
