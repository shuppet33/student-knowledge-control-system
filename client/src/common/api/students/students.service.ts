import { apiFetch } from '../api.client'

import { studentsMapper } from './students.mapper'
import type { Student, StudentDto } from './students.types'

export const getStudents = async (): Promise<Student[]> => {
    const response = await apiFetch('/admin/students', {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Ошибка получения студентов')
    }

    const data: StudentDto[] = await response.json()

    return studentsMapper(data)
}
