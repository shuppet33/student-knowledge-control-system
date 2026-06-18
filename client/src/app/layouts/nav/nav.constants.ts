import type { NavConfig } from './nav.types'

export const NAV_CONFIG: NavConfig = {
    admin: [
        { label: 'Главная', to: '/admin' },
        { label: 'Преподаватели', to: '/admin/teachers' },
        { label: 'Студенты', to: '/admin/students' },
        { label: 'Тесты', to: '/admin/tests' },
    ],
    teacher: [
        { label: 'Главная', to: '/teacher' },
        { label: 'Тесты', to: '/teacher/tests' },
    ],
    student: [
        { label: 'Главная', to: '/student' },
        { label: 'Тесты', to: '/student/tests' },
    ],
}
