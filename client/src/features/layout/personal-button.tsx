import {Button} from "antd";

import { reatomComponent } from "@reatom/npm-react";

import {Navigate, useLocation} from "react-router";

import {authAtom, logoutAsync} from "$entities/api.ts";

export const PersonalButton = reatomComponent(({ctx}) => {
    const { role } = ctx.spy(authAtom)
    const location = useLocation();

    const logout = () => {
        logoutAsync(ctx)

        return <Navigate to="/" state={{from: location}} replace/>;
    }

    return (
        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
            <span>{role}</span>

            <Button loading={ctx.spy(logoutAsync.statusesAtom).isPending} onClick={logout}>
                выйти
            </Button>
        </div>
    )
})
