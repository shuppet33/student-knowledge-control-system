import { apiFetch } from '../api.client'

import { studentGroupsMapper } from './students.mapper'
import type {
    StudentGroup,
    StudentGroupDto,
} from './students.types'

export const getStudents = async (): Promise<StudentGroup[]> => {
    const response = await apiFetch('/admin/students', {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Ошибка получения студентов')
    }

    const data: StudentGroupDto[] = await response.json()

    return studentGroupsMapper(data)
}
