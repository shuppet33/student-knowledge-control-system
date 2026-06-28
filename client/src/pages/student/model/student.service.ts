import {
    reatomAsync,
    reatomResource,
    withDataAtom,
    withErrorAtom,
    withStatusesAtom,
} from '@reatom/framework'

import {
    getMySubjects,
    getSubjectTests,
    saveStudentAnswer,
    startStudentTest,
} from '$common/api/students/students.service.ts'

import {
    activeStudentTestAtom,
    currentQuestionIndexAtom,
    selectAnswerAction,
    selectedTestAtom,
    subjectIdAtom,
} from './student.state'

export const getMySubjectsResource = reatomResource(async () => {
    return await getMySubjects()
}).pipe(withDataAtom([]))

export const getSubjectTestsResource = reatomResource(async (ctx) => {
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

        if (!test) {
            return
        }

        const startedTest = await startStudentTest(test.id)

        activeStudentTestAtom(ctx, startedTest)
        currentQuestionIndexAtom(ctx, 0)
    })
}, 'startStudentTestAsync').pipe(withStatusesAtom(), withErrorAtom())

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

        selectAnswerAction(ctx, questionId, answerId)

        await saveStudentAnswer(test.attemptId, {
            questionId,
            answerId,
        })
    })
}, 'saveStudentAnswerAsync').pipe(withStatusesAtom(), withErrorAtom())
