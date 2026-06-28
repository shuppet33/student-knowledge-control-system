import { apiFetch } from '../api.client'

import {
    mapSaveStudentAnswerPayloadToDto,
    mapSearchStudentsPayloadToDto,
    startedStudentTestMapper,
    studentGroupsMapper,
    studentsOptionsMapper,
    studentSubjectsMapper,
    studentSubjectTestsMapper,
} from './students.mapper'
import type {
    SaveStudentAnswerPayload,
    SearchStudentsPayload,
    StartedStudentTestDto,
    Student,
    StudentDto,
    StudentGroup,
    StudentGroupDto,
    StudentSubjectDto,
    StudentSubjectTestsDto,
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

export const searchStudents = async (payload: SearchStudentsPayload): Promise<Student[]> => {
    const query = new URLSearchParams()
    const dto = mapSearchStudentsPayloadToDto(payload)

    query.set('search', dto.search)
    query.set('excluded_group_id', dto.excluded_group_id)
    query.set('limit', String(dto.limit))

    const response = await apiFetch(`/admin/students/search?${query}`, {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Ошибка поиска студентов')
    }

    const data: StudentDto[] = await response.json()

    return studentsOptionsMapper(data)
}

export const getMySubjects = async () => {
    const response = await apiFetch('/student/subjects', {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Ошибка получения предметов')
    }

    const data: StudentSubjectDto[] = await response.json()

    return studentSubjectsMapper(data)
}

export const getSubjectTests = async (subjectId: string) => {
    const response = await apiFetch(`/student/subjects/${subjectId}/tests`, {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Ошибка получения тестов')
    }

    const data: StudentSubjectTestsDto = await response.json()

    return studentSubjectTestsMapper(data)
}

export const startStudentTest = async (testId: string) => {
    const response = await apiFetch(`/student/tests/${testId}/start`, {
        method: 'POST',
    })

    if (!response.ok) {
        throw new Error('Ошибка запуска теста')
    }

    const data: StartedStudentTestDto = await response.json()

    return startedStudentTestMapper(data)
}

export const saveStudentAnswer = async (
    attemptId: string,
    payload: SaveStudentAnswerPayload,
) => {
    const response = await apiFetch(`/student/attempts/${attemptId}/answers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            mapSaveStudentAnswerPayloadToDto(payload),
        ),
    })

    if (!response.ok) {
        throw new Error('Ошибка сохранения ответа')
    }
}
