import { atom } from '@reatom/framework'

export const themeAtom = atom<'dark' | 'light'>(
    (localStorage.getItem('theme') as 'dark' | 'light') || 'light',
)
