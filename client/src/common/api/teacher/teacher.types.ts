export type TeacherSubjectDto = {
    id: string
    name: string
    created_at: string | null
}

export type TeacherSubject = {
    id: string
    name: string
    createdAt: string | null
}

export type AssignTeacherSubjectPayload = {
    subjectId: string
}

export type AssignTeacherSubjectDto = {
    subject_id: string
}

export type CreateTeacherSubjectPayload = {
    name: string
}

export type CreateTeacherSubjectDto = {
    name: string
}

export type TeacherSubjectTestDto = {
    id: string
    title: string
    subject_id: string
    is_active: boolean
    created_at: string
    teacher_test_id: string
    created_by: string | null
    created_by_name: string | null
    group_ids: string[]
}

export type TeacherSubjectTest = {
    id: string
    title: string
    subjectId: string
    isActive: boolean
    createdAt: string
    teacherTestId: string
    createdBy: string | null
    createdByName: string | null
    groupIds: string[]
}

export type TeacherTestQuestionAnswerDto = {
    id: string
    text: string
    is_correct: boolean
}

export type TeacherTestQuestionDto = {
    id: string
    text: string
    type: string
    position: number
    answers: TeacherTestQuestionAnswerDto[]
}

export type TeacherTestQuestionAnswer = {
    id: string
    text: string
    isCorrect: boolean
}

export type TeacherTestQuestion = {
    id: string
    text: string
    type: string
    position: number
    answers: TeacherTestQuestionAnswer[]
}

export type TeacherTestDetailsDto = TeacherSubjectTestDto & {
    test_version_id: string | null
    questions_count: number
    questions: TeacherTestQuestionDto[]
}

export type TeacherTestDetails = TeacherSubjectTest & {
    testVersionId: string | null
    questionsCount: number
    questions: TeacherTestQuestion[]
}

export type SaveTeacherTestQuestionAnswerPayload = {
    id: string
    text: string
    isCorrect: boolean
}

export type SaveTeacherTestQuestionPayload = {
    id: string
    text: string
    type?: string
    answers: SaveTeacherTestQuestionAnswerPayload[]
}

export type SaveTeacherTestQuestionAnswerDto = {
    id: string
    text: string
    is_correct: boolean
}

export type SaveTeacherTestQuestionDto = {
    id: string
    text: string
    type?: string
    answers: SaveTeacherTestQuestionAnswerDto[]
}

export type SaveTeacherTestQuestionsPayload = {
    questions: SaveTeacherTestQuestionPayload[]
}

export type SaveTeacherTestQuestionsDto = {
    questions: SaveTeacherTestQuestionDto[]
}

export type UpdateTeacherTestPayload = {
    title?: string
    isActive?: boolean
}

export type UpdateTeacherTestDto = {
    title?: string
    is_active?: boolean
}

export type UpdateTeacherTestGroupsPayload = {
    groupIds: string[]
}

export type UpdateTeacherTestGroupsDto = {
    group_ids: string[]
}
