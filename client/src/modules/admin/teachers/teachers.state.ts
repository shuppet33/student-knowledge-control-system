import { action, atom } from '@reatom/framework'

import {
    assignSubjectToTeacherAsync,
    createSubjectAndAssignAsync,
} from '$modules/admin/teachers/teachers.service.ts'

import type { Teacher } from '$common/api/teachers/teachers.types'

export const selectedTeacherAtom = atom(
    null as Teacher | null,
    'selectedTeacherAtom',
)
export const selectedSubjectAtom = atom(
    { id: null, name: null } as { id: string | null; name: string | null },
    'selectedSubjectAtom',
)
export const expandedTestIdAtom = atom(
    null as string | null,
    'expandedTestIdAtom',
)
export const isSubjectInfoOpenAtom = atom(false, 'isSubjectInfoOpenAtom')
export const isTestInfoOpenAtom = atom(false, 'isTestInfoOpenAtom')
export const isAddSubjectOpenAtom = atom(false, 'isAddSubjectOpenAtom')
export const selectedNewSubjectIdAtom = atom(
    undefined as string | undefined,
    'selectedNewSubjectIdAtom',
)
export const newSubjectNameAtom = atom('', 'newSubjectNameAtom')
export const subjectSearchAtom = atom('', 'subjectSearchAtom')

export const changeSubjectSearchAction = action((ctx, value: string) => {
    subjectSearchAtom(ctx, value)
}, 'changeSubjectSearchAction')

export const openTeacherModalAction = action((ctx, teacher: Teacher) => {
    selectedTeacherAtom(ctx, teacher)
}, 'openTeacherModalAction')

export const closeTeacherModalAction = action((ctx) => {
    selectedTeacherAtom(ctx, null)
    selectedSubjectAtom(ctx, { id: null, name: null })
    expandedTestIdAtom(ctx, null)
    isSubjectInfoOpenAtom(ctx, false)
    isTestInfoOpenAtom(ctx, false)
}, 'closeTeacherModalAction')

export const selectSubjectAction = action(
    (ctx, subject: { id: string; name: string }) => {
        selectedSubjectAtom(ctx, subject)
    },
    'selectSubjectAction',
)

export const toggleTestAction = action((ctx, testId: string) => {
    const current = ctx.get(expandedTestIdAtom)

    expandedTestIdAtom(ctx, current === testId ? null : testId)
}, 'toggleTestAction')

export const openSubjectInfoAction = action((ctx) => {
    isSubjectInfoOpenAtom(ctx, true)
}, 'openSubjectInfoAction')

export const closeSubjectInfoAction = action((ctx) => {
    isSubjectInfoOpenAtom(ctx, false)
}, 'closeSubjectInfoAction')

export const openTestInfoAction = action((ctx) => {
    isTestInfoOpenAtom(ctx, true)
}, 'openTestInfoAction')

export const closeTestInfoAction = action((ctx) => {
    isTestInfoOpenAtom(ctx, false)
}, 'closeTestInfoAction')

export const openAddSubjectAction = action((ctx) => {
    isAddSubjectOpenAtom(ctx, true)
}, 'openAddSubjectAction')

export const closeAddSubjectAction = action((ctx) => {
    isAddSubjectOpenAtom(ctx, false)
    selectedNewSubjectIdAtom(ctx, undefined)
    newSubjectNameAtom(ctx, '')

    createSubjectAndAssignAsync.errorAtom.reset(ctx)
    createSubjectAndAssignAsync.statusesAtom.reset(ctx)
    assignSubjectToTeacherAsync.errorAtom.reset(ctx)
    assignSubjectToTeacherAsync.statusesAtom.reset(ctx)
}, 'closeAddSubjectAction')

export const changeSelectedSubjectAction = action((ctx, value: string) => {
    selectedNewSubjectIdAtom(ctx, value)
    newSubjectNameAtom(ctx, '')
}, 'changeSelectedSubjectAction')

export const changeNewSubjectNameAction = action((ctx, value: string) => {
    newSubjectNameAtom(ctx, value)
    selectedNewSubjectIdAtom(ctx, undefined)
}, 'changeNewSubjectNameAction')
