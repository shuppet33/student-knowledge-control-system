import {computed, withAsyncData, wrap} from "@reatom/core";
import {ADRESS} from "$shared/constants/api/api.ts";
import {authAtom} from "./auth/auth.atom.ts";

export const isAuthResults = computed(async () => {
    const {token} = authAtom()

    if (!token) return null

    try {
        const response = await wrap(fetch(`${ADRESS}/auth/me`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
                'credentials': 'include'
            },
        }))

        if (!response.ok) {
            throw new Error('Ошибка запроса')
        }

        return await wrap(response.json())

    } catch (e) {
        console.log('LOOOG', e)
    }
}).extend(withAsyncData({initState: null}))