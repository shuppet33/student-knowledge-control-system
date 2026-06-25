import { withConcurrency } from '@reatom/effects'
import {
    action,
    reatomAsync,
    reatomResource,
    withDataAtom,
    withErrorAtom,
    withStatusesAtom,
} from '@reatom/framework'

import { createGroupAsync } from '$modules/admin/students/ui/create-group-popover/create-group-popover.service.ts'

import {
    addSubjectToGroup,
    getGroups,
    removeSubjectFromGroup,
} from '$common/api/groups/groups.service'
import {
    getSubjectGroups,
    getSubjectTeachers,
} from '$common/api/subjects/subject-relations.service'
import {
    getSubject,
    updateSubjectName,
} from '$common/api/subjects/subjects.service'
import {
    assignSubjectToTeacher,
    deleteTeacherSubject,
} from '$common/api/teacher-subjects/teacher-subjects.service'
import { getTeachers } from '$common/api/teachers/teachers.service'

import {
    closeGroupsPopoverAction,
    closeTeachersPopoverAction,
    selectedGroupIdsAtom,
    selectedTeacherIdsAtom,
    subjectIdAtom,
    subjectNameAtom,
} from './subject-details.state'

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
            updateSubjectName(subjectId, normalizedName),
        )
    },
    'changeSubjectDetailsNameAction',
).pipe(withConcurrency())

export const subjectResource = reatomResource(async (ctx) => {
    const subjectId = ctx.spy(subjectIdAtom)

    if (!subjectId) {
        return null
    }

    const subject = await getSubject(subjectId)

    subjectNameAtom(ctx, subject.name)

    return subject
}, 'subjectDetailsResource').pipe(withDataAtom(null), withStatusesAtom())

export const allGroupsResource = reatomResource(async (ctx) => {
    ctx.spy(createGroupAsync.onFulfill)

    return await getGroups()
}, 'allGroupsResource').pipe(withDataAtom([]), withStatusesAtom())

export const allTeachersResource = reatomResource(async () => {
    return await getTeachers()
}, 'allTeachersResource').pipe(withDataAtom([]), withStatusesAtom())

export const subjectGroupsResource = reatomResource(async (ctx) => {
    ctx.spy(saveSubjectGroupsAsync.onFulfill)
    ctx.spy(removeSubjectGroupAsync.onFulfill)
    const subjectId = ctx.spy(subjectIdAtom)

    const groups = subjectId ? await getSubjectGroups(subjectId) : []

    selectedGroupIdsAtom(
        ctx,
        groups.map((group) => group.id),
    )

    return groups
}, 'subjectGroupsResource').pipe(withDataAtom([]), withStatusesAtom())

export const subjectTeachersResource = reatomResource(async (ctx) => {
    ctx.spy(saveSubjectTeachersAsync.onFulfill)
    ctx.spy(removeSubjectTeacherAsync.onFulfill)
    const subjectId = ctx.spy(subjectIdAtom)

    const teachers = subjectId
        ? await getSubjectTeachers(subjectId)
        : []

    selectedTeacherIdsAtom(
        ctx,
        teachers.map((teacher) => teacher.id),
    )

    return teachers
}, 'subjectTeachersResource').pipe(withDataAtom([]), withStatusesAtom())

export const saveSubjectGroupsAsync = reatomAsync((ctx, close = true) => {
    return ctx.schedule(async () => {
        const subjectId = ctx.get(subjectIdAtom)
        const selectedIds = ctx.get(selectedGroupIdsAtom)
        const currentIds = ctx
            .get(subjectGroupsResource.dataAtom)
            .map((group) => group.id)

        if (!subjectId) {
            return
        }

        await Promise.all([
            ...selectedIds
                .filter((id) => !currentIds.includes(id))
                .map((id) => addSubjectToGroup(id, subjectId)),
            ...currentIds
                .filter((id) => !selectedIds.includes(id))
                .map((id) => removeSubjectFromGroup(id, subjectId)),
        ])

        if (close) {
            closeGroupsPopoverAction(ctx)
        }
    })
}, 'saveSubjectGroupsAsync').pipe(withStatusesAtom(), withErrorAtom())

export const saveSubjectTeachersAsync = reatomAsync(
    (ctx, close = true) => {
    return ctx.schedule(async () => {
        const subjectId = ctx.get(subjectIdAtom)
        const selectedIds = ctx.get(selectedTeacherIdsAtom)
        const currentIds = ctx
            .get(subjectTeachersResource.dataAtom)
            .map((teacher) => teacher.id)

        if (!subjectId) {
            return
        }

        await Promise.all([
            ...selectedIds
                .filter((id) => !currentIds.includes(id))
                .map((id) =>
                    assignSubjectToTeacher(id, { subjectId }),
                ),
            ...currentIds
                .filter((id) => !selectedIds.includes(id))
                .map((id) => deleteTeacherSubject(id, subjectId)),
        ])

        if (close) {
            closeTeachersPopoverAction(ctx)
        }
    })
    },
    'saveSubjectTeachersAsync',
).pipe(withStatusesAtom(), withErrorAtom())

export const removeSubjectGroupAsync = reatomAsync(
    (ctx, groupId: string) => {
        return ctx.schedule(async () => {
            const subjectId = ctx.get(subjectIdAtom)

            if (subjectId) {
                await removeSubjectFromGroup(groupId, subjectId)
            }
        })
    },
    'removeSubjectGroupAsync',
).pipe(withStatusesAtom(), withErrorAtom())

export const removeSubjectTeacherAsync = reatomAsync(
    (ctx, teacherId: string) => {
        return ctx.schedule(async () => {
            const subjectId = ctx.get(subjectIdAtom)

            if (subjectId) {
                await deleteTeacherSubject(teacherId, subjectId)
            }
        })
    },
    'removeSubjectTeacherAsync',
).pipe(withStatusesAtom(), withErrorAtom())
