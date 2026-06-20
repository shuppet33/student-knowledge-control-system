import { apiFetch } from '../api.client'

import { teacherTestsMapper } from './teacher-tests.mapper'
import type {
    TeacherTest,
    TeacherTestDto,
} from './teacher-tests.types'

export const getTeacherTests = async (
    teacherId: string,
    subjectId: string,
): Promise<TeacherTest[]> => {
    const response = await apiFetch(
        `/admin/teachers/${teacherId}/subjects/${subjectId}/tests`,
        {
            method: 'GET',
        },
    )

    if (!response.ok) {
        throw new Error('Ошибка получения тестов')
    }

    const data: TeacherTestDto[] = await response.json()

    return teacherTestsMapper(data)
}
