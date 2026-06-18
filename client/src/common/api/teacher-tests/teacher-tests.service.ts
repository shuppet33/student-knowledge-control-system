import { API_ROUTES } from '../api.constants'
import { apiRequest } from '../api-client.service'

import { teacherTestsMapper } from './teacher-tests.mapper'
import type {
    TeacherTest,
    TeacherTestDto,
} from './teacher-tests.types'

export const getTeacherTests = async (
    teacherId: string,
    subjectId: string,
): Promise<TeacherTest[]> => {
    const data = await apiRequest<TeacherTestDto[]>(
        API_ROUTES.teacherTests(teacherId, subjectId),
    )

    return teacherTestsMapper(data)
}
