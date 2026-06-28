export type StudentDto = {
    id: string
    full_name: string
    email: string
    created_at: string
}

export type Student = {
    id: string
    fullName: string
    email: string
    createdAt: string
}

export type StudentGroupDto = {
    group_id: string | null
    group_name: string
    students: StudentDto[]
}

export type StudentGroup = {
    groupId: string | null
    groupName: string
    students: Student[]
}

export type SearchStudentsDto = {
    search: string
    excluded_group_id: string
    limit: number
}

export type SearchStudentsPayload = {
    search: string
    excludedGroupId: string
    limit?: number
}

export type StudentSubjectDto = {
    id: string,
    name: string
    average_score: number | null
    passed_tests_count: number
    total_tests_count: number
}

export type StudentSubject = {
    id: string,
    name: string
    averageScore: number | null
    passedTestsCount: number
    totalTestsCount: number
}

export type StudentTestDto = {
    id: string
    teacher_test_id: string
    title: string
    questions_count: number
    answers_count: number
    score: number | null
    attempt_status: string | null
    date_of_appointment: string
}

export type StudentTest = {
    id: string
    teacherTestId: string
    title: string
    metrics: {
        from: number
        to: number
    }
    score: number | null
    attemptStatus: string | null
    dateOfAppointment: string
}

export type StudentSubjectTestsDto = {
    subject: StudentSubjectDto
    tests: StudentTestDto[]
}

export type StudentSubjectTests = {
    subject: StudentSubject
    tests: StudentTest[]
}

export type StudentAnswerDto = {
    id: string
    text: string
    is_selected: boolean
}

export type StudentAnswer = {
    id: string
    text: string
    isSelected: boolean
}

export type StudentQuestionDto = {
    id: string
    text: string
    type: string
    position: number
    answers: StudentAnswerDto[]
}

export type StudentQuestion = {
    id: string
    text: string
    type: string
    position: number
    answers: StudentAnswer[]
}

export type StartedStudentTestDto = {
    attempt_id: string
    test: {
        id: string
        teacher_test_id: string
        title: string
    }
    questions: StudentQuestionDto[]
}

export type StartedStudentTest = {
    attemptId: string
    test: {
        id: string
        teacherTestId: string
        title: string
    }
    questions: StudentQuestion[]
}

export type SaveStudentAnswerPayload = {
    questionId: string
    answerId: string
    isSelected: boolean
}

export type SaveStudentAnswerDto = {
    question_id: string
    answer_id: string
    is_selected: boolean
}

export type FinishStudentAttemptDto = {
    id: string
    score: number
}

export type FinishStudentAttempt = {
    id: string
    score: number
}
