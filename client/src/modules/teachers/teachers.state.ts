import { action, atom } from '@reatom/framework'

import type { Teacher } from '$common/api/teachers/teachers.types'

import type {
    ChangeCreateTeacherFieldPayload,
    CreateTeacherForm,
} from './teachers.types'

export const selectedTeacherAtom = atom(
    null as Teacher | null,
    'selectedTeacherAtom',
)
export const selectedSubjectIdAtom = atom(
    null as string | null,
    'selectedSubjectIdAtom',
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

export const openTeacherModalAction = action((ctx, teacher: Teacher) => {
    selectedTeacherAtom(ctx, teacher)
}, 'openTeacherModalAction')

export const closeTeacherModalAction = action((ctx) => {
    selectedTeacherAtom(ctx, null)
    selectedSubjectIdAtom(ctx, null)
    expandedTestIdAtom(ctx, null)
}, 'closeTeacherModalAction')

export const selectSubjectAction = action((ctx, subjectId: string) => {
    selectedSubjectIdAtom(ctx, subjectId)
}, 'selectSubjectAction')

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
