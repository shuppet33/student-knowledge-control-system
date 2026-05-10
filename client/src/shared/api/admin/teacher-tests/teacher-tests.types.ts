export type TeacherTestDto = {
    id: string
    title: string
    subject_id: string
    is_active: boolean
    is_private: boolean
    show_answers: boolean
    show_score: boolean
    max_attempts: number
    teacher_test_id: string
    created_at: string
}

export type TeacherTest = {
    id: string
    title: string
    subjectId: string
    isActive: boolean
    isPrivate: boolean
    showAnswers: boolean
    showScore: boolean
    maxAttempts: number
    teacherTestId: string
    createdAt: string
}