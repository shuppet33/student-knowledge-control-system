import {
    type SearchStudentsDto,
    type SearchStudentsPayload,
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
    return subjects.map(({ id, name }) => ({
        id,
        name,
    }))
}

export const studentTestMapper = (test: StudentTestDto): StudentTest => ({
    id: test.id,
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
    subject: data.subject,
    tests: data.tests.map(studentTestMapper),
})
