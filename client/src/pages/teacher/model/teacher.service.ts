import { withConcurrency } from '@reatom/effects'
import {
    action,
    reatomAsync,
    reatomResource,
    withDataAtom,
    withErrorAtom,
    withStatusesAtom,
} from '@reatom/framework'

import {
    addMyTeacherSubjectToGroup,
    assignSubjectToMe,
    createSubjectAndAssignToMe,
    getMyTeacherSubject,
    getMyTeacherSubjectGroups,
    getMyTeacherSubjects,
    getTeacherAvailableSubjects,
    getTeacherGroups,
    removeMyTeacherSubjectFromGroup,
    updateMyTeacherSubjectName,
} from '$common/api/teacher/teacher.service'

import {
    newSubjectNameAtom,
    selectedGroupIdsAtom,
    selectedNewSubjectIdAtom,
    subjectIdAtom,
    subjectNameAtom,
} from './teacher.state'

export const getMyTeacherSubjectsResource = reatomResource(async (ctx) => {
    ctx.spy(assignSubjectToMeAsync.onFulfill)
    ctx.spy(createSubjectAndAssignToMeAsync.onFulfill)

    return await getMyTeacherSubjects()
}, 'getMyTeacherSubjectsResource').pipe(withDataAtom([]), withStatusesAtom())

export const teacherSubjectsResource = reatomResource(async (ctx) => {
    ctx.spy(createSubjectAndAssignToMeAsync.onFulfill)

    return await getTeacherAvailableSubjects()
}, 'teacherSubjectsResource').pipe(withDataAtom([]), withStatusesAtom())

export const teacherSubjectResource = reatomResource(async (ctx) => {
    const subjectId = ctx.spy(subjectIdAtom)

    if (!subjectId) {
        return null
    }

    const subject = await getMyTeacherSubject(subjectId)

    subjectNameAtom(ctx, subject.name)

    return subject
}, 'teacherSubjectResource').pipe(withDataAtom(null), withStatusesAtom())

export const teacherGroupsResource = reatomResource(async () => {
    return await getTeacherGroups()
}, 'teacherGroupsResource').pipe(withDataAtom([]), withStatusesAtom())

export const teacherSubjectGroupsResource = reatomResource(async (ctx) => {
    ctx.spy(saveTeacherSubjectGroupsAsync.onFulfill)

    const subjectId = ctx.spy(subjectIdAtom)
    const groups = subjectId ? await getMyTeacherSubjectGroups(subjectId) : []

    selectedGroupIdsAtom(
        ctx,
        groups.map((group) => group.id),
    )

    return groups
}, 'teacherSubjectGroupsResource').pipe(withDataAtom([]), withStatusesAtom())

export const changeSubjectNameAction = action(
    async (ctx, name: string) => {
        subjectNameAtom(ctx, name)

        const subjectId = ctx.get(subjectIdAtom)
        const normalizedName = name.trim()

        if (!subjectId || !normalizedName) {
            return
        }

        await ctx.schedule(
            () =>
                new Promise<void>((resolve) => {
                    window.setTimeout(resolve, 600)
                }),
        )

        await ctx.schedule(() =>
            updateMyTeacherSubjectName(subjectId, normalizedName),
        )
    },
    'changeTeacherSubjectNameAction',
).pipe(withConcurrency())

export const saveTeacherSubjectGroupsAsync = reatomAsync((ctx) => {
    return ctx.schedule(async () => {
        const subjectId = ctx.get(subjectIdAtom)
        const selectedIds = ctx.get(selectedGroupIdsAtom)
        const currentIds = ctx
            .get(teacherSubjectGroupsResource.dataAtom)
            .map((group) => group.id)

        if (!subjectId) {
            return
        }

        await Promise.all([
            ...selectedIds
                .filter((id) => !currentIds.includes(id))
                .map((id) => addMyTeacherSubjectToGroup(id, subjectId)),
            ...currentIds
                .filter((id) => !selectedIds.includes(id))
                .map((id) => removeMyTeacherSubjectFromGroup(id, subjectId)),
        ])
    })
}, 'saveTeacherSubjectGroupsAsync').pipe(withStatusesAtom(), withErrorAtom())

export const assignSubjectToMeAsync = reatomAsync((ctx) => {
    return ctx.schedule(async () => {
        const subjectId = ctx.get(selectedNewSubjectIdAtom)

        if (!subjectId) {
            return
        }

        await assignSubjectToMe({ subjectId })
    })
}, 'assignSubjectToMeAsync').pipe(withStatusesAtom(), withErrorAtom())

export const createSubjectAndAssignToMeAsync = reatomAsync((ctx) => {
    return ctx.schedule(async () => {
        const name = ctx.get(newSubjectNameAtom)

        if (!name.trim()) {
            return
        }

        await createSubjectAndAssignToMe({ name })
    })
}, 'createSubjectAndAssignToMeAsync').pipe(
    withStatusesAtom(),
    withErrorAtom(),
)
