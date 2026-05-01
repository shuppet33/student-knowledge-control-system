import {Header as HeaderAntd} from "antd/es/layout/layout"
import {authAtom} from "$entities/auth/auth.atom.ts";
import {Nav} from "$features/layout/nav.tsx";
import {PersonalButton} from "$features/layout/personal-button.tsx";
import {theme} from "antd";
import {ThemeSwitcher} from "$features/shared/theme-switch.tsx";


export const Header = () => {
    const {role} = authAtom()
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <>
            <HeaderAntd style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: colorBgContainer
            }}>
                <Nav role={role}/>
                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <PersonalButton/>
                    <ThemeSwitcher />
                </div>
            </HeaderAntd>
        </>
    )
}