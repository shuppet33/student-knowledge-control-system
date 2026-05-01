import {action, withAsync, wrap} from "@reatom/core";
import {ADRESS} from "$shared/constants/api/api.ts";
import {authAtom} from "$entities/auth/auth.atom.ts";

export const loginAsync = action(async (email: string, password: string) => {
    const response = await wrap(fetch(`${ADRESS}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({email, password}),
    }))

    if (!response.ok) {
        throw new Error('Ошибка логина')
    }

    const {token, role} = await wrap(response.json())

    authAtom.set({
        token,
        role
    })

    console.log('LOOOG 3')
    return await wrap(response.json())
}, 'loginAsync').extend(withAsync())