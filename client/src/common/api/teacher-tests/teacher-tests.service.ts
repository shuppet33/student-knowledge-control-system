import { API_URL } from '../api.constants'

import { teacherTestsMapper } from './teacher-tests.mapper'
import type {
    TeacherTest,
    TeacherTestDto,
} from './teacher-tests.types'

export const getTeacherTests = async (
    teacherId: string,
    subjectId: string,
): Promise<TeacherTest[]> => {
    const response = await fetch(
        `${API_URL}/teachers/${teacherId}/subjects/${subjectId}/tests`,
        {
            method: 'GET',
            credentials: 'include',
        },
    )

    if (!response.ok) {
        throw new Error('Ошибка получения тестов')
    }

    const data: TeacherTestDto[] = await response.json()

    return teacherTestsMapper(data)
}
