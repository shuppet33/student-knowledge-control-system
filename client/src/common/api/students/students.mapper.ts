import {
    type Student,
    type StudentDto,
} from './students.types'

export const studentsMapper = (students: StudentDto[]): Student[] => {
    return students.map((student) => ({
        id: student.id,
        fullName: student.full_name,
        email: student.email,
        createdAt: student.created_at,
    }))
}
