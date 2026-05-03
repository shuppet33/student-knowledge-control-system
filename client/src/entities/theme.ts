import {atom} from "@reatom/framework";

export const themeAtom = atom<'light' | 'dark'>(localStorage.getItem('theme') as 'light' | 'dark' || 'light');