import { apiFetch } from '../api.client'
import type { Group } from '../groups/groups.types'

import {
    mapAssignTeacherSubjectPayloadToDto,
    mapCreateTeacherSubjectPayloadToDto,
    mapCreateTeacherTestPayloadToDto,
    mapSaveTeacherTestQuestionsPayloadToDto,
    mapUpdateTeacherTestGroupsPayloadToDto,
    mapUpdateTeacherTestPayloadToDto,
    teacherSubjectMapper,
    teacherSubjectsMapper,
    teacherSubjectTestsMapper,
    teacherTestDetailsMapper,
} from './teacher.mapper'
import type {
    AssignTeacherSubjectPayload,
    CreateTeacherSubjectPayload,
    CreateTeacherTestPayload,
    SaveTeacherTestQuestionsPayload,
    TeacherSubject,
    TeacherSubjectDto,
    TeacherSubjectTest,
    TeacherSubjectTestDto,
    TeacherTestDetails,
    TeacherTestDetailsDto,
    UpdateTeacherTestGroupsPayload,
    UpdateTeacherTestPayload,
} from './teacher.types'

export const getMyTeacherSubjects = async (): Promise<TeacherSubject[]> => {
    const response = await apiFetch('/teacher/subjects', {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Ошибка получения предметов преподавателя')
    }

    const data: TeacherSubjectDto[] = await response.json()

    return teacherSubjectsMapper(data)
}

export const getTeacherAvailableSubjects = async (): Promise<TeacherSubject[]> => {
    const response = await apiFetch('/teacher/subjects/all', {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Ошибка получения предметов')
    }

    const data: TeacherSubjectDto[] = await response.json()

    return teacherSubjectsMapper(data)
}

export const getMyTeacherSubject = async (
    subjectId: string,
): Promise<TeacherSubject> => {
    const response = await apiFetch(`/teacher/subjects/${subjectId}`, {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Ошибка получения предмета')
    }

    const data: TeacherSubjectDto = await response.json()

    return teacherSubjectMapper(data)
}

export const updateMyTeacherSubjectName = async (
    subjectId: string,
    name: string,
): Promise<TeacherSubject> => {
    const response = await apiFetch(`/teacher/subjects/${subjectId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    })

    if (!response.ok) {
        throw new Error('Ошибка обновления предмета')
    }

    const data: TeacherSubjectDto = await response.json()

    return teacherSubjectMapper(data)
}

export const getTeacherGroups = async (): Promise<Group[]> => {
    const response = await apiFetch('/teacher/groups', {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Ошибка получения групп')
    }

    return await response.json()
}

export const getMyTeacherSubjectGroups = async (
    subjectId: string,
): Promise<Group[]> => {
    const response = await apiFetch(`/teacher/subjects/${subjectId}/groups`, {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Ошибка получения групп предмета')
    }

    return await response.json()
}

export const addMyTeacherSubjectToGroup = async (
    groupId: string,
    subjectId: string,
): Promise<void> => {
    const response = await apiFetch(`/teacher/groups/${groupId}/subjects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject_id: subjectId }),
    })

    if (!response.ok) {
        throw new Error('Ошибка добавления группы к предмету')
    }
}

export const removeMyTeacherSubjectFromGroup = async (
    groupId: string,
    subjectId: string,
): Promise<void> => {
    const response = await apiFetch(
        `/teacher/groups/${groupId}/subjects/${subjectId}`,
        {
            method: 'DELETE',
        },
    )

    if (!response.ok) {
        throw new Error('Ошибка удаления группы из предмета')
    }
}

export const getMyTeacherSubjectTests = async (
    subjectId: string,
): Promise<TeacherSubjectTest[]> => {
    const response = await apiFetch(`/teacher/subjects/${subjectId}/tests`, {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Ошибка получения тестов предмета')
    }

    const data: TeacherSubjectTestDto[] = await response.json()

    return teacherSubjectTestsMapper(data)
}

export const getMyTeacherTestDetails = async (
    teacherTestId: string,
): Promise<TeacherTestDetails> => {
    const response = await apiFetch(`/teacher/tests/${teacherTestId}`, {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Ошибка получения теста')
    }

    const data: TeacherTestDetailsDto = await response.json()

    return teacherTestDetailsMapper(data)
}

export const deleteMyTeacherTest = async (testId: string) => {
    const response = await apiFetch(`/teacher/tests/${testId}`, {
        method: 'DELETE',
    })

    if (!response.ok) {
        throw new Error('Ошибка удаления теста')
    }

    return response.json()
}

export const createMyTeacherTest = async (
    subjectId: string,
    payload: CreateTeacherTestPayload,
): Promise<void> => {
    const response = await apiFetch(`/teacher/subjects/${subjectId}/tests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            mapCreateTeacherTestPayloadToDto(payload),
        ),
    })

    if (!response.ok) {
        throw new Error('Ошибка создания теста')
    }
}

export const saveMyTeacherTestQuestions = async (
    teacherTestId: string,
    payload: SaveTeacherTestQuestionsPayload,
): Promise<void> => {
    const response = await apiFetch(`/teacher/tests/${teacherTestId}/questions`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            mapSaveTeacherTestQuestionsPayloadToDto(payload),
        ),
    })

    if (!response.ok) {
        throw new Error('Ошибка сохранения вопросов теста')
    }
}

export const updateMyTeacherTest = async (
    teacherTestId: string,
    payload: UpdateTeacherTestPayload,
): Promise<void> => {
    const response = await apiFetch(`/teacher/tests/${teacherTestId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            mapUpdateTeacherTestPayloadToDto(payload),
        ),
    })

    if (!response.ok) {
        throw new Error('Ошибка обновления теста')
    }
}

export const updateMyTeacherTestGroups = async (
    teacherTestId: string,
    payload: UpdateTeacherTestGroupsPayload,
): Promise<void> => {
    const response = await apiFetch(`/teacher/tests/${teacherTestId}/groups`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            mapUpdateTeacherTestGroupsPayloadToDto(payload),
        ),
    })

    if (!response.ok) {
        throw new Error('Ошибка обновления групп теста')
    }
}

export const assignSubjectToMe = async (
    payload: AssignTeacherSubjectPayload,
): Promise<void> => {
    const response = await apiFetch('/teacher/subjects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            mapAssignTeacherSubjectPayloadToDto(payload),
        ),
    })

    if (!response.ok) {
        throw new Error('Ошибка назначения предмета')
    }
}

export const createSubjectAndAssignToMe = async (
    payload: CreateTeacherSubjectPayload,
): Promise<TeacherSubject> => {
    const response = await apiFetch('/teacher/subjects/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            mapCreateTeacherSubjectPayloadToDto(payload),
        ),
    })

    if (!response.ok) {
        throw new Error('Ошибка создания предмета')
    }

    const data: TeacherSubjectDto = await response.json()

    return teacherSubjectMapper(data)
}
