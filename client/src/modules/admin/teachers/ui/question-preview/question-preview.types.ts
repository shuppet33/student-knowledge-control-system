export type QuestionAnswer = {
    id: string
    text: string
    isCorrect: boolean
}

export type Question = {
    id: string
    position: number
    text: string
    answers: QuestionAnswer[]
}

export type QuestionPreviewNavigationItem = {
    id: string
    position: number
}
