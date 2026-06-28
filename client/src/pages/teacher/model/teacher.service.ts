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
    getMyTeacherSubjectTests,
    getMyTeacherTestDetails,
    getTeacherAvailableSubjects,
    getTeacherGroups,
    removeMyTeacherSubjectFromGroup,
    saveMyTeacherTestQuestions,
    updateMyTeacherSubjectName,
    updateMyTeacherTest,
    updateMyTeacherTestGroups,
} from '$common/api/teacher/teacher.service'
import type { TeacherSubjectTest } from '$common/api/teacher/teacher.types'

import {
    closeAddQuestionModalAction,
    closeEditTestModalAction,
    newSubjectNameAtom,
    selectedGroupIdsAtom,
    selectedNewSubjectIdAtom,
    selectedTeacherTestAtom,
    selectedTeacherTestGroupIdsAtom,
    subjectIdAtom,
    subjectNameAtom,
    teacherQuestionDraftsAtom,
    teacherTestTitleAtom,
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

export const teacherSubjectTestsResource = reatomResource(async (ctx) => {
    ctx.spy(toggleTeacherTestActiveAsync.onFulfill)
    ctx.spy(saveTeacherTestAsync.onFulfill)

    const subjectId = ctx.spy(subjectIdAtom)

    if (!subjectId) {
        return []
    }

    return await getMyTeacherSubjectTests(subjectId)
}, 'teacherSubjectTestsResource').pipe(withDataAtom([]), withStatusesAtom())

export const teacherTestDetailsResource = reatomResource(async (ctx) => {
    ctx.spy(saveTeacherTestQuestionsAsync.onFulfill)

    const test = ctx.spy(selectedTeacherTestAtom)

    if (!test) {
        return null
    }

    const details = await getMyTeacherTestDetails(test.teacherTestId)

    teacherTestTitleAtom(ctx, details.title)
    selectedTeacherTestGroupIdsAtom(ctx, details.groupIds)

    return details
}, 'teacherTestDetailsResource').pipe(withDataAtom(null), withStatusesAtom())

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

export const toggleTeacherTestActiveAsync = reatomAsync((
    ctx,
    test: TeacherSubjectTest,
) => {
    return ctx.schedule(() => {
        return updateMyTeacherTest(test.teacherTestId, {
            isActive: !test.isActive,
        })
    })
}, 'toggleTeacherTestActiveAsync').pipe(withStatusesAtom(), withErrorAtom())

export const saveTeacherTestAsync = reatomAsync((ctx) => {
    return ctx.schedule(async () => {
        const test = ctx.get(selectedTeacherTestAtom)
        const title = ctx.get(teacherTestTitleAtom)
        const groupIds = ctx.get(selectedTeacherTestGroupIdsAtom)

        if (!test) {
            return
        }

        await updateMyTeacherTest(test.teacherTestId, {
            title,
        })
        await updateMyTeacherTestGroups(test.teacherTestId, {
            groupIds,
        })

        closeEditTestModalAction(ctx)
    })
}, 'saveTeacherTestAsync').pipe(withStatusesAtom(), withErrorAtom())

export const saveTeacherTestQuestionsAsync = reatomAsync((ctx) => {
    return ctx.schedule(async () => {
        const test = ctx.get(selectedTeacherTestAtom)
        const drafts = ctx.get(teacherQuestionDraftsAtom)

        if (!test) {
            return
        }

        const isPersistedId = (id: string): boolean => /^\d+$/.test(id)
        const questions = drafts
            .map((question) => ({
                id: question.id,
                text: question.text,
                type: 'single',
                answers: question.answers
                    .filter((answer) =>
                        isPersistedId(answer.id) || answer.text.trim(),
                    )
                    .map((answer) => ({
                        id: answer.id,
                        text: answer.text,
                        isCorrect: answer.isCorrect,
                    })),
            }))
            .filter((question) =>
                isPersistedId(question.id) ||
                question.text.trim() ||
                question.answers.length > 0,
            )

        await saveMyTeacherTestQuestions(test.teacherTestId, {
            questions,
        })

        closeAddQuestionModalAction(ctx)
    })
}, 'saveTeacherTestQuestionsAsync').pipe(withStatusesAtom(), withErrorAtom())

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
