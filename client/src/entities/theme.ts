import {atom} from "@reatom/core";

export const themeAtom = atom<'light' | 'dark'>(localStorage.getItem('theme') as 'light' | 'dark' || 'light');