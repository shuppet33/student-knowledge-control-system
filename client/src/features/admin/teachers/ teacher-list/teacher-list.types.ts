import type { Teacher } from '$shared/api/admin/teachers/teachers.types.ts'

export type TeacherListProps = {
    teachers: Teacher[]
}

export type TeacherCardProps = {
    teacher: Teacher
}