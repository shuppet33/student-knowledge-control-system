import { type Teacher, type TeacherDto } from './teachers.types'

export const teachersMapper = (teachers: TeacherDto[]): Teacher[] => {
    return teachers.map((teacher) => ({
        id: teacher.id,
        fullName: teacher.full_name,
        email: teacher.email,
    }))
}