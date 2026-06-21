import {
    type Student,
    type StudentDto,
    type StudentGroup,
    type StudentGroupDto,
} from './students.types'

const studentsMapper = (students: StudentDto[]): Student[] => {
    return students.map((student) => ({
        id: student.id,
        fullName: student.full_name,
        email: student.email,
        createdAt: student.created_at,
    }))
}

export const studentGroupsMapper = (
    groups: StudentGroupDto[],
): StudentGroup[] => {
    return groups.map((group) => ({
        groupId: group.group_id,
        groupName: group.group_name,
        students: studentsMapper(group.students),
    }))
}
