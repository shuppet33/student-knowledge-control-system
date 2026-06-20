export type AdminTestDto = {
    id: string
    title: string
    created_by: string | null
    created_by_name: string | null
    is_active: boolean
    is_private: boolean
    show_answers: boolean
    show_score: boolean
    max_attempts: number | null
    created_at: string
}

export type AdminTest = {
    id: string
    title: string
    createdBy: string | null
    createdByName: string | null
    isActive: boolean
    isPrivate: boolean
    showAnswers: boolean
    showScore: boolean
    maxAttempts: number | null
    createdAt: string
}

export type AdminTestGroupDto = {
    subject_id: string | null
    subject_name: string
    tests: AdminTestDto[]
}

export type AdminTestGroup = {
    subjectId: string | null
    subjectName: string
    tests: AdminTest[]
}
