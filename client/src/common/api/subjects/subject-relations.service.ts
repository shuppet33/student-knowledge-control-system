import { apiFetch } from '../api.client'
import type { Group, GroupDto } from '../groups/groups.types'
import type {
    Teacher,
    TeacherDto,
} from '../teachers/teachers.types'

export const getSubjectGroups = async (
    subjectId: string,
): Promise<Group[]> => {
    const response = await apiFetch(`/admin/subjects/${subjectId}/groups`)

    if (!response.ok) {
        throw new Error('Ошибка получения групп предмета')
    }

    const groups: GroupDto[] = await response.json()

    return groups
}

export const getSubjectTeachers = async (
    subjectId: string,
): Promise<Teacher[]> => {
    const response = await apiFetch(
        `/admin/subjects/${subjectId}/teachers`,
    )

    if (!response.ok) {
        throw new Error('Ошибка получения преподавателей предмета')
    }

    const teachers: TeacherDto[] = await response.json()

    return teachers.map((teacher) => ({
        id: teacher.id,
        fullName: teacher.full_name,
        email: teacher.email,
    }))
}
