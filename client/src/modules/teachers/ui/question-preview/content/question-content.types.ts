import type { QuestionAnswer } from '../question-preview.types'

export type QuestionContentProps = {
    questionNumber: number
    questionText: string
    answers: QuestionAnswer[]
}
