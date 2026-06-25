export type QuestionAnswer = {
    id: number
    text: string
    isCorrect: boolean
}

export type Question = {
    id: number
    text: string
    answers: QuestionAnswer[]
}
