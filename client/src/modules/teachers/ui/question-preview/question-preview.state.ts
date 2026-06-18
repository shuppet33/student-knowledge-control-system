import { action, atom } from '@reatom/framework'

import type { Question } from './question-preview.types'

export const isQuestionPreviewOpenAtom = atom(
    false,
    'isQuestionPreviewOpenAtom',
)
export const selectedQuestionIdAtom = atom(
    null as number | null,
    'selectedQuestionIdAtom',
)
export const openQuestionPreviewAction = action((ctx, questionId: number) => {
    selectedQuestionIdAtom(ctx, questionId)
    isQuestionPreviewOpenAtom(ctx, true)
}, 'openQuestionPreviewAction')

export const closeQuestionPreviewAction = action((ctx) => {
    isQuestionPreviewOpenAtom(ctx, false)
    selectedQuestionIdAtom(ctx, null)
}, 'closeQuestionPreviewAction')

export const nextQuestionAction = action(
    (ctx, questions: Question[]) => {
        const currentQuestionId = ctx.get(selectedQuestionIdAtom)
        const currentIndex = questions.findIndex(
            (question) => question.id === currentQuestionId,
        )

        if (currentIndex === -1 || currentIndex >= questions.length - 1) {
            return
        }

        selectedQuestionIdAtom(ctx, questions[currentIndex + 1].id)
    },
    'nextQuestionAction',
)

export const prevQuestionAction = action(
    (ctx, questions: Question[]) => {
        const currentQuestionId = ctx.get(selectedQuestionIdAtom)
        const currentIndex = questions.findIndex(
            (question) => question.id === currentQuestionId,
        )

        if (currentIndex <= 0) {
            return
        }

        selectedQuestionIdAtom(ctx, questions[currentIndex - 1].id)
    },
    'prevQuestionAction',
)
