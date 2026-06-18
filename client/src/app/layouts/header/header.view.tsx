import { theme } from 'antd'
import { Header as AntdHeader } from 'antd/es/layout/layout'

import { reatomComponent } from '@reatom/npm-react'

import { authAtom, PersonalButton } from '$modules/auth'
import { ThemeSwitcher } from '$modules/theme'

import { Nav } from '../nav/nav.view'

export const Header = reatomComponent(({ ctx }) => {
    const { role } = ctx.spy(authAtom)
    const {
        token: { colorBgContainer },
    } = theme.useToken()

    return (
        <AntdHeader
            style={{
                padding: '0 10px',
                backgroundColor: colorBgContainer,
            }}
        >
            <div
                style={{
                    maxWidth: '1280px',
                    width: '100%',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {role !== 'guest' && <Nav role={role} />}

                <div
                    style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                    }}
                >
                    <PersonalButton />
                    <ThemeSwitcher />
                </div>
            </div>
        </AntdHeader>
    )
})
