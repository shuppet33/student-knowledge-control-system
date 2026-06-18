import type { Question } from '../question-preview.types'

export type QuestionNavigationProps = {
    currentQuestion: number | null
    questions: Question[]
}
