import type { Teacher } from '$common/api/teachers/teachers.types'

export type TeacherListProps = {
    teachers: Teacher[]
}

export type TeacherCardProps = {
    teacher: Teacher
}
