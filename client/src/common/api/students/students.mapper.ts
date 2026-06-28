import {
    type SaveStudentAnswerDto,
    type SaveStudentAnswerPayload,
    type SearchStudentsDto,
    type SearchStudentsPayload,
    type StartedStudentTest,
    type StartedStudentTestDto,
    type Student,
    type StudentDto,
    type StudentGroup,
    type StudentGroupDto,
    type StudentSubject,
    type StudentSubjectDto,
    type StudentSubjectTests,
    type StudentSubjectTestsDto,
    type StudentTest,
    type StudentTestDto,
} from './students.types'

const studentsMapper = (students: StudentDto[]): Student[] => {
    return students.map((student) => ({
        id: student.id,
        fullName: student.full_name,
        email: student.email,
        createdAt: student.created_at,
    }))
}

export const studentGroupsMapper = (groups: StudentGroupDto[]): StudentGroup[] => {
    return groups.map((group) => ({
        groupId: group.group_id,
        groupName: group.group_name,
        students: studentsMapper(group.students),
    }))
}

export const mapSearchStudentsPayloadToDto = (
    payload: SearchStudentsPayload
): SearchStudentsDto => {
    return {
        search: payload.search,
        excluded_group_id: payload.excludedGroupId,
        limit: payload.limit ?? 50,
    }
}

export const studentsOptionsMapper = (students: StudentDto[]): Student[] => {
    return studentsMapper(students)
}

export const studentSubjectsMapper = (subjects: StudentSubjectDto[]): StudentSubject[] => {
    return subjects.map(({
        id,
        name,
        average_score,
        passed_tests_count,
        total_tests_count,
    }) => ({
        id,
        name,
        averageScore: average_score,
        passedTestsCount: passed_tests_count,
        totalTestsCount: total_tests_count,
    }))
}

export const studentTestMapper = (test: StudentTestDto): StudentTest => ({
    id: test.id,
    teacherTestId: test.teacher_test_id,
    title: test.title,
    metrics: {
        from: test.answers_count,
        to: test.questions_count,
    },
    score: test.score,
    dateOfAppointment: test.date_of_appointment,
})

export const studentSubjectTestsMapper = (
    data: StudentSubjectTestsDto,
): StudentSubjectTests => ({
    subject: {
        id: data.subject.id,
        name: data.subject.name,
        averageScore: data.subject.average_score ?? null,
        passedTestsCount: data.subject.passed_tests_count ?? 0,
        totalTestsCount: data.subject.total_tests_count ?? 0,
    },
    tests: data.tests.map(studentTestMapper),
})

export const startedStudentTestMapper = (
    data: StartedStudentTestDto,
): StartedStudentTest => ({
    attemptId: data.attempt_id,
    test: {
        id: data.test.id,
        teacherTestId: data.test.teacher_test_id,
        title: data.test.title,
    },
    questions: data.questions.map((question) => ({
        id: question.id,
        text: question.text,
        type: question.type,
        position: question.position,
        answers: question.answers.map((answer) => ({
            id: answer.id,
            text: answer.text,
            isSelected: answer.is_selected,
        })),
    })),
})

export const mapSaveStudentAnswerPayloadToDto = (
    payload: SaveStudentAnswerPayload,
): SaveStudentAnswerDto => ({
    question_id: payload.questionId,
    answer_id: payload.answerId,
})
