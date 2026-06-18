import type { NavConfig } from './nav.types'

export const NAV_CONFIG: NavConfig = {
    admin: [
        { label: 'главная', to: '/admin' },
        { label: 'преподаватели', to: '/admin/teachers' },
        { label: 'студенты', to: '/admin/students' },
        { label: 'тесты', to: '/admin/tests' },
    ],
    teacher: [
        { label: 'главная', to: '/teacher' },
        { label: 'тесты', to: '/teacher/tests' },
    ],
    student: [
        { label: 'главная', to: '/student' },
        { label: 'тесты', to: '/student/tests' },
    ],
}
