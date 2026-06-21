import { type TeacherTest, type TeacherTestDto } from './teacher-tests.types'

export const teacherTestsMapper = (tests: TeacherTestDto[]): TeacherTest[] => {
    return tests.map((test) => ({
        id: test.id,
        title: test.title,
        subjectId: test.subject_id,
        isActive: test.is_active,
        isPrivate: test.is_private,
        showAnswers: test.show_answers,
        showScore: test.show_score,
        maxAttempts: test.max_attempts,
        teacherTestId: test.teacher_test_id,
        createdBy: test.created_by,
        createdByName: test.created_by_name,
        createdAt: test.created_at,
    }))
}
