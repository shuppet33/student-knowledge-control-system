import type { QuestionPreviewNavigationItem } from '../question-preview.types'

export type QuestionNavigationProps = {
    currentQuestion: string | null
    questions: QuestionPreviewNavigationItem[]
}
