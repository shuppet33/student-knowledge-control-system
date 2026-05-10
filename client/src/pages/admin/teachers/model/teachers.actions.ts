import { action } from '@reatom/core'

import type { Teacher } from '$shared/api/admin/teachers/teachers.types.ts'

import {
    expandedTestIdAtom,
    selectedSubjectIdAtom,
    selectedTeacherAtom,
} from './teachers.atoms.ts'

export const openTeacherModalAction = action(
    (ctx, teacher: Teacher) => {
        selectedTeacherAtom(ctx, teacher)
    },
    'openTeacherModalAction',
)

export const closeTeacherModalAction = action(
    (ctx) => {
        selectedTeacherAtom(ctx, null)
        selectedSubjectIdAtom(ctx, null)
        expandedTestIdAtom(ctx, null)
    },
    'closeTeacherModalAction',
)

export const selectSubjectAction = action(
    (ctx, subjectId: string) => {
        selectedSubjectIdAtom(ctx, subjectId)
    },
    'selectSubjectAction',
)

export const toggleTestAction = action(
    (ctx, testId: string) => {
        const current = ctx.get(expandedTestIdAtom)

        expandedTestIdAtom(
            ctx,
            current === testId ? null : testId,
        )
    },
    'toggleTestAction',
)