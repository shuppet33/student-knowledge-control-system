import type {
    AdminTest,
    AdminTestDto,
    AdminTestGroup,
    AdminTestGroupDto,
} from './tests.types'

const testMapper = (test: AdminTestDto): AdminTest => {
    return {
        id: test.id,
        title: test.title,
        createdBy: test.created_by,
        createdByName: test.created_by_name,
        isActive: test.is_active,
        isPrivate: test.is_private,
        showAnswers: test.show_answers,
        showScore: test.show_score,
        maxAttempts: test.max_attempts,
        createdAt: test.created_at,
    }
}

export const testGroupsMapper = (
    groups: AdminTestGroupDto[],
): AdminTestGroup[] => {
    return groups.map((group) => ({
        subjectId: group.subject_id,
        subjectName: group.subject_name,
        tests: group.tests.map(testMapper),
    }))
}
