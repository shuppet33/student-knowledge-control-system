import {atom} from "@reatom/core";

export const authAtom = atom<{
    token: string | null,
    role: 'student' | 'admin' | 'teacher' | null
}>({
    token: null,
    role: null
})

