import type { TeacherTestDto } from '$common/api/teacher-tests/teacher-tests.types'

export const teacherTestsFixture: TeacherTestDto[] = [
    {
        id: 'test-1',
        title: 'Основы SQL',
        subject_id: 'subject-2',
        is_active: true,
        is_private: false,
        show_answers: true,
        show_score: true,
        max_attempts: 3,
        teacher_test_id: 'teacher-test-1',
        created_by: 'teacher-1',
        created_by_name: 'Карташова Кира Александровна',
        created_at: '2026-01-03T00:00:00.000Z',
    },
]
