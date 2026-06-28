import { action, atom } from '@reatom/framework'

import {
    assignSubjectToMeAsync,
    createSubjectAndAssignToMeAsync,
} from './teacher.service'

export const isAddSubjectOpenAtom = atom(false, 'isTeacherAddSubjectOpenAtom')
export const subjectIdAtom = atom(null as string | null, 'teacherSubjectIdAtom')
export const subjectNameAtom = atom('', 'teacherSubjectNameAtom')
export const selectedGroupIdsAtom = atom<string[]>(
    [],
    'selectedTeacherSubjectGroupIdsAtom',
)
export const isCreateTestModalOpenAtom = atom(
    false,
    'isCreateTeacherTestModalOpenAtom',
)
export const selectedNewSubjectIdAtom = atom(
    undefined as string | undefined,
    'selectedTeacherNewSubjectIdAtom',
)
export const newSubjectNameAtom = atom('', 'teacherNewSubjectNameAtom')

export const openAddSubjectAction = action((ctx) => {
    isAddSubjectOpenAtom(ctx, true)
}, 'openTeacherAddSubjectAction')

export const closeAddSubjectAction = action((ctx) => {
    isAddSubjectOpenAtom(ctx, false)
    selectedNewSubjectIdAtom(ctx, undefined)
    newSubjectNameAtom(ctx, '')

    createSubjectAndAssignToMeAsync.errorAtom.reset(ctx)
    createSubjectAndAssignToMeAsync.statusesAtom.reset(ctx)
    assignSubjectToMeAsync.errorAtom.reset(ctx)
    assignSubjectToMeAsync.statusesAtom.reset(ctx)
}, 'closeTeacherAddSubjectAction')

export const changeSelectedSubjectAction = action((ctx, value: string) => {
    selectedNewSubjectIdAtom(ctx, value)
    newSubjectNameAtom(ctx, '')
}, 'changeTeacherSelectedSubjectAction')

export const changeNewSubjectNameAction = action((ctx, value: string) => {
    newSubjectNameAtom(ctx, value)
    selectedNewSubjectIdAtom(ctx, undefined)
}, 'changeTeacherNewSubjectNameAction')

export const setSelectedGroupIdsAction = action(
    (ctx, groupIds: string[]) => {
        selectedGroupIdsAtom(ctx, groupIds)
    },
    'setSelectedTeacherSubjectGroupIdsAction',
)

export const openCreateTestModalAction = action((ctx) => {
    isCreateTestModalOpenAtom(ctx, true)
}, 'openCreateTeacherTestModalAction')

export const closeCreateTestModalAction = action((ctx) => {
    isCreateTestModalOpenAtom(ctx, false)
}, 'closeCreateTeacherTestModalAction')
