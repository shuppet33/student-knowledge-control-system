import {theme} from "antd";
import {Header as HeaderAntd} from "antd/es/layout/layout"

import { reatomComponent } from "@reatom/npm-react";

import {authAtom} from "$entities/api.ts";

import {ThemeSwitcher} from "../shared/theme-switch.tsx";

import {Nav} from "./nav.tsx";
import {PersonalButton} from "./personal-button.tsx";


export const Header = reatomComponent(({ctx}) => {
    const {role} = ctx.spy(authAtom)
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <>
            <HeaderAntd style={{
                padding: '0 10px',
                backgroundColor: colorBgContainer,
            }}>
                <div style={{
                    maxWidth: '1280px',
                    width: '100%',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Nav role={role}/>
                    <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                        <PersonalButton/>
                        <ThemeSwitcher />
                    </div>
                </div>
            </HeaderAntd>
        </>
    )
})