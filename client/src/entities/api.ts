import {atom, reatomAsync, withStatusesAtom} from "@reatom/framework";

export const API_URL = 'http://localhost:3000'

export const authAtom = atom({
    accessToken: null,
    role: null
})

export const isAuthAtom = atom((ctx) => {
    return Boolean(ctx.spy(authAtom).accessToken);
})



export const getTokenAuthAsync = reatomAsync((ctx, email: string, password: string) => {
    return ctx.schedule(async () => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({email, password}),
        })

        const {token, role} = await response.json()

        authAtom(ctx, {
            accessToken: token,
            role
        })
    })
}).pipe(withStatusesAtom())

export const refreshAsync = reatomAsync(async (ctx) => {
    return ctx.schedule(async () => {

        try {
            const res = await fetch(`${API_URL}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!res.ok) throw new Error('refresh failed');

            const {token, role} = await res.json();

            authAtom(ctx, {
                accessToken: token,
                role
            })

            return {
                token,
                role
            };
        } catch  {
            authAtom(ctx, {
                accessToken: null,
                role: null
            })
            throw new Error('not authorized');
        }
    })
}).pipe(withStatusesAtom());

export const logoutAsync = reatomAsync((ctx) => {
    return ctx.schedule(async () => {
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        })

        authAtom(ctx, { accessToken: null, role: null });

        return await response.json()
    })
}).pipe(withStatusesAtom())



