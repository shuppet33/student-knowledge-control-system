import { action, atom } from '@reatom/framework'

export const newSubjectNameAtom = atom('', 'adminNewSubjectNameAtom')
export const isCreateSubjectOpenAtom = atom(
    false,
    'isCreateSubjectOpenAtom',
)

export const changeNewSubjectNameAction = action((ctx, value: string) => {
    newSubjectNameAtom(ctx, value)
}, 'changeAdminNewSubjectNameAction')

export const openCreateSubjectAction = action((ctx) => {
    isCreateSubjectOpenAtom(ctx, true)
}, 'openCreateSubjectAction')

export const closeCreateSubjectAction = action((ctx) => {
    isCreateSubjectOpenAtom(ctx, false)
    newSubjectNameAtom(ctx, '')
}, 'closeCreateSubjectAction')
