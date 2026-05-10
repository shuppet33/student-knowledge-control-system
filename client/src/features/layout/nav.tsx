import { Button } from 'antd'

import { NavLink } from 'react-router'

const navConfig: {
    admin: { label: string; to: string }[]
    teacher: { label: string; to: string }[]
    student: { label: string; to: string }[]
} = {
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

export const Nav = ({ role }: { role: 'student' | 'teacher' | 'admin' }) => {
    const items = navConfig[role] ?? []

    return (
        <nav style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {items.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.to === '/admin'}>
                    {({ isActive }) => (
                        <Button type={isActive ? 'primary' : 'default'}>
                            {item.label}
                        </Button>
                    )}
                </NavLink>
            ))}
        </nav>
    )
}
