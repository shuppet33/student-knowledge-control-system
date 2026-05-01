import {reatomComponent} from "@reatom/react";
import {authAtom} from "$entities/auth/auth.atom.ts";
import {useNavigate, useRouter} from "@tanstack/react-router";
import {Button} from "antd";

export const PersonalButton = reatomComponent(() => {
    const { role } = authAtom()
    const navigate = useNavigate()
    const router = useRouter()

    const logout = () => {
        authAtom.set({ token: null, role: null })

        navigate({ to: '/' })
        router.invalidate()
    }

    return (
        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
            <span>{role}</span>

            <Button onClick={logout}>
                выйти
            </Button>
        </div>
    )
})
