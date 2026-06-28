import { action, atom } from '@reatom/framework'

import type {
    StartedStudentTest,
    StudentTest,
} from '$common/api/students/students.types'

export const subjectIdAtom = atom(null as string | null, 'studentSubjectIdAtom')

export const selectedTestAtom = atom(
    null as StudentTest | null,
    'selectedStudentTestAtom',
)

export const activeStudentTestAtom = atom(
    null as StartedStudentTest | null,
    'activeStudentTestAtom',
)

export const currentQuestionIndexAtom = atom(
    0,
    'currentStudentQuestionIndexAtom',
)

export const openStudentSubjectAction = action((ctx, subjectId: string) => {
    if (ctx.get(subjectIdAtom) === subjectId) {
        return
    }

    subjectIdAtom(ctx, subjectId)
    selectedTestAtom(ctx, null)
    activeStudentTestAtom(ctx, null)
    currentQuestionIndexAtom(ctx, 0)
}, 'openStudentSubjectAction')

export const selectStudentTestAction = action((ctx, test: StudentTest) => {
    selectedTestAtom(ctx, test)
    activeStudentTestAtom(ctx, null)
    currentQuestionIndexAtom(ctx, 0)
}, 'selectStudentTestAction')

export const setCurrentQuestionIndexAction = action((ctx, index: number) => {
    currentQuestionIndexAtom(ctx, index)
}, 'setCurrentStudentQuestionIndexAction')

export const nextQuestionAction = action((ctx) => {
    const test = ctx.get(activeStudentTestAtom)
    const currentIndex = ctx.get(currentQuestionIndexAtom)

    if (!test || currentIndex >= test.questions.length - 1) {
        return
    }

    currentQuestionIndexAtom(ctx, currentIndex + 1)
}, 'nextStudentQuestionAction')

export const prevQuestionAction = action((ctx) => {
    const currentIndex = ctx.get(currentQuestionIndexAtom)

    if (currentIndex <= 0) {
        return
    }

    currentQuestionIndexAtom(ctx, currentIndex - 1)
}, 'prevStudentQuestionAction')

export const selectAnswerAction = action((
    ctx,
    questionId: string,
    answerId: string,
    isSelected: boolean,
) => {
    const test = ctx.get(activeStudentTestAtom)

    if (!test) {
        return
    }

    activeStudentTestAtom(ctx, {
        ...test,
        questions: test.questions.map((question) => {
            if (question.id !== questionId) {
                return question
            }

            return {
                ...question,
                answers: question.answers.map((answer) => ({
                    ...answer,
                    isSelected:
                        question.type === 'multiple'
                            ? answer.id === answerId
                                ? isSelected
                                : answer.isSelected
                            : answer.id === answerId,
                })),
            }
        }),
    })
}, 'selectStudentAnswerAction')
