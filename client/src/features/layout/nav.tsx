import {Button} from "antd";
import {Link} from "react-router";


const navConfig = {
    admin: [
        { label: 'главная', to: '/admin' },
        { label: 'студенты', to: '/admin/students' },
        { label: 'тесты', to: '/admin/tests' },
        { label: 'преподаватели', to: '/admin/teachers' },
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

export const Nav = ({role}) => {
    const items = navConfig[role] ?? []

    return (
        <nav style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
            {items.map(item => (
                <Button>
                    <Link key={item.to} to={item.to}>
                        {item.label}
                    </Link>
                </Button>
            ))}
        </nav>
    )
}