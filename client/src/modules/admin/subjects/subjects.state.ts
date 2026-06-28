import { action, atom } from '@reatom/framework'

export const newSubjectNameAtom = atom('', 'adminNewSubjectNameAtom')
export const isCreateSubjectOpenAtom = atom(
    false,
    'isCreateSubjectOpenAtom',
)

export const closeCreateSubjectAction = action((ctx) => {
    isCreateSubjectOpenAtom(ctx, false)
    newSubjectNameAtom(ctx, '')
}, 'closeCreateSubjectAction')
