import type { TeacherDto } from '$common/api/teachers/teachers.types'

export const teachersFixture: TeacherDto[] = [
    {
        id: 'teacher-1',
        full_name: 'Анна Иванова',
        email: 'anna@example.com',
    },
    {
        id: 'teacher-2',
        full_name: 'Иван Петров',
        email: 'ivan@example.com',
    },
]
