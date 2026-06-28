import {
    reatomAsync,
    reatomResource,
    withDataAtom,
    withErrorAtom,
    withStatusesAtom,
} from '@reatom/framework'

import {
    finishStudentAttempt,
    finishStudentAttemptKeepalive,
    getMySubjects,
    getSubjectTests,
    saveStudentAnswer,
    startStudentTest,
} from '$common/api/students/students.service.ts'
import type { StudentTest } from '$common/api/students/students.types'

import {
    activeStudentTestAtom,
    currentQuestionIndexAtom,
    selectAnswerAction,
    selectedTestAtom,
    selectStudentTestAction,
    subjectIdAtom,
} from './student.state'

const activeAttemptStorageKey = 'activeStudentAttemptId'

if (typeof window !== 'undefined') {
    window.addEventListener('pagehide', () => {
        const attemptId = window.localStorage.getItem(activeAttemptStorageKey)

        if (attemptId) {
            finishStudentAttemptKeepalive(attemptId)
            window.localStorage.removeItem(activeAttemptStorageKey)
        }
    })
}

export const getMySubjectsResource = reatomResource(async () => {
    return await getMySubjects()
}).pipe(withDataAtom([]))

export const getSubjectTestsResource = reatomResource(async (ctx) => {
    ctx.spy(finishStudentAttemptAsync.onFulfill)
    ctx.spy(selectStudentTestAsync.onFulfill)

    const subjectId = ctx.spy(subjectIdAtom)

    if (!subjectId) {
        return {
            subject: null,
            tests: [],
        }
    }

    return getSubjectTests(subjectId)
}).pipe(
    withDataAtom({
        subject: null,
        tests: [],
    }),
)

export const startStudentTestAsync = reatomAsync((ctx) => {
    return ctx.schedule(async () => {
        const test = ctx.get(selectedTestAtom)

        if (!test || test.score !== null) {
            return
        }

        const startedTest = await startStudentTest(test.id)

        activeStudentTestAtom(ctx, startedTest)
        currentQuestionIndexAtom(ctx, 0)
        window.localStorage.setItem(
            activeAttemptStorageKey,
            startedTest.attemptId,
        )
    })
}, 'startStudentTestAsync').pipe(withStatusesAtom(), withErrorAtom())

export const selectStudentTestAsync = reatomAsync((ctx, test: StudentTest) => {
    return ctx.schedule(async () => {
        const activeTest = ctx.get(activeStudentTestAtom)

        if (activeTest && activeTest.test.id !== test.id) {
            await finishStudentAttempt(activeTest.attemptId)
            window.localStorage.removeItem(activeAttemptStorageKey)
        }

        selectStudentTestAction(ctx, test)
    })
}, 'selectStudentTestAsync').pipe(withStatusesAtom(), withErrorAtom())

export const finishStudentAttemptAsync = reatomAsync((ctx) => {
    return ctx.schedule(async () => {
        const activeTest = ctx.get(activeStudentTestAtom)
        const selectedTest = ctx.get(selectedTestAtom)

        if (!activeTest) {
            return
        }

        const attempt = await finishStudentAttempt(activeTest.attemptId)

        window.localStorage.removeItem(activeAttemptStorageKey)
        activeStudentTestAtom(ctx, null)
        currentQuestionIndexAtom(ctx, 0)

        if (selectedTest) {
            selectedTestAtom(ctx, {
                ...selectedTest,
                score: attempt.score,
                attemptStatus: 'completed',
            })
        }
    })
}, 'finishStudentAttemptAsync').pipe(withStatusesAtom(), withErrorAtom())

export const saveStudentAnswerAsync = reatomAsync((
    ctx,
    questionId: string,
    answerId: string,
) => {
    return ctx.schedule(async () => {
        const test = ctx.get(activeStudentTestAtom)

        if (!test) {
            return
        }

        const question = test.questions.find(({ id }) => id === questionId)
        const answer = question?.answers.find(({ id }) => id === answerId)
        const isSelected = question?.type === 'multiple'
            ? !answer?.isSelected
            : true

        selectAnswerAction(ctx, questionId, answerId, isSelected)

        await saveStudentAnswer(test.attemptId, {
            questionId,
            answerId,
            isSelected,
        })
    })
}, 'saveStudentAnswerAsync').pipe(withStatusesAtom(), withErrorAtom())
