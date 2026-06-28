import {
    type AssignTeacherSubjectDto,
    type AssignTeacherSubjectPayload,
    type CreateTeacherSubjectDto,
    type CreateTeacherSubjectPayload,
    type SaveTeacherTestQuestionsDto,
    type SaveTeacherTestQuestionsPayload,
    type TeacherSubject,
    type TeacherSubjectDto,
    type TeacherSubjectTest,
    type TeacherSubjectTestDto,
    type TeacherTestDetails,
    type TeacherTestDetailsDto,
    type TeacherTestQuestion,
    type TeacherTestQuestionDto,
    type UpdateTeacherTestDto,
    type UpdateTeacherTestGroupsDto,
    type UpdateTeacherTestGroupsPayload,
    type UpdateTeacherTestPayload,
} from './teacher.types'

export const teacherSubjectMapper = (
    subject: TeacherSubjectDto,
): TeacherSubject => {
    return {
        id: subject.id,
        name: subject.name,
        createdAt: subject.created_at,
    }
}

export const teacherSubjectsMapper = (
    subjects: TeacherSubjectDto[],
): TeacherSubject[] => {
    return subjects.map(teacherSubjectMapper)
}

export const mapAssignTeacherSubjectPayloadToDto = (
    payload: AssignTeacherSubjectPayload,
): AssignTeacherSubjectDto => {
    return {
        subject_id: payload.subjectId,
    }
}

export const mapCreateTeacherSubjectPayloadToDto = (
    payload: CreateTeacherSubjectPayload,
): CreateTeacherSubjectDto => {
    return {
        name: payload.name,
    }
}

export const teacherSubjectTestsMapper = (
    tests: TeacherSubjectTestDto[],
): TeacherSubjectTest[] => {
    return tests.map((test) => ({
        id: test.id,
        title: test.title,
        subjectId: test.subject_id,
        isActive: test.is_active,
        createdAt: test.created_at,
        teacherTestId: test.teacher_test_id,
        createdBy: test.created_by,
        createdByName: test.created_by_name,
        groupIds: test.group_ids,
    }))
}

export const teacherTestDetailsMapper = (
    test: TeacherTestDetailsDto,
): TeacherTestDetails => {
    return {
        id: test.id,
        title: test.title,
        subjectId: test.subject_id,
        isActive: test.is_active,
        createdAt: test.created_at,
        teacherTestId: test.teacher_test_id,
        createdBy: test.created_by,
        createdByName: test.created_by_name,
        groupIds: test.group_ids,
        testVersionId: test.test_version_id,
        questionsCount: test.questions_count,
        questions: test.questions.map(teacherTestQuestionMapper),
    }
}

export const teacherTestQuestionMapper = (
    question: TeacherTestQuestionDto,
): TeacherTestQuestion => {
    return {
        id: question.id,
        text: question.text,
        type: question.type,
        position: question.position,
        answers: question.answers.map((answer) => ({
            id: answer.id,
            text: answer.text,
            isCorrect: answer.is_correct,
        })),
    }
}

export const mapSaveTeacherTestQuestionsPayloadToDto = (
    payload: SaveTeacherTestQuestionsPayload,
): SaveTeacherTestQuestionsDto => {
    return {
        questions: payload.questions.map((question) => ({
            id: question.id,
            text: question.text,
            type: question.type,
            answers: question.answers.map((answer) => ({
                id: answer.id,
                text: answer.text,
                is_correct: answer.isCorrect,
            })),
        })),
    }
}

export const mapUpdateTeacherTestPayloadToDto = (
    payload: UpdateTeacherTestPayload,
): UpdateTeacherTestDto => {
    return {
        title: payload.title,
        is_active: payload.isActive,
    }
}

export const mapUpdateTeacherTestGroupsPayloadToDto = (
    payload: UpdateTeacherTestGroupsPayload,
): UpdateTeacherTestGroupsDto => {
    return {
        group_ids: payload.groupIds,
    }
}
