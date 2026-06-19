import { action, atom } from '@reatom/framework'

import {
    assignSubjectToTeacherAsync,
    createSubjectAndAssignAsync,
} from '$modules/teachers/teachers.service.ts'

import type { Teacher } from '$common/api/teachers/teachers.types'

import type {
    ChangeCreateTeacherFieldPayload,
    CreateTeacherForm,
} from './teachers.types'

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
export const isAddSubjectOpenAtom = atom(false, 'isAddSubjectOpenAtom')
export const selectedNewSubjectIdAtom = atom(
    undefined as string | undefined,
    'selectedNewSubjectIdAtom',
)
export const newSubjectNameAtom = atom('', 'newSubjectNameAtom')
export const isCreateTeacherOpenAtom = atom(false, 'isCreateTeacherOpenAtom')
export const createTeacherFormAtom = atom<CreateTeacherForm>(
    {
        fullName: '',
        email: '',
        password: '',
        repeatPassword: '',
    },
    'createTeacherFormAtom',
)

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

export const openCreateTeacherAction = action((ctx) => {
    isCreateTeacherOpenAtom(ctx, true)
}, 'openCreateTeacherAction')

export const closeCreateTeacherAction = action((ctx) => {
    isCreateTeacherOpenAtom(ctx, false)
    createTeacherFormAtom(ctx, {
        fullName: '',
        email: '',
        password: '',
        repeatPassword: '',
    })
}, 'closeCreateTeacherAction')

export const changeCreateTeacherFieldAction = action(
    (ctx, payload: ChangeCreateTeacherFieldPayload) => {
        const form = ctx.get(createTeacherFormAtom)

        createTeacherFormAtom(ctx, {
            ...form,
            [payload.field]: payload.value,
        })
    },
    'changeCreateTeacherFieldAction',
)
