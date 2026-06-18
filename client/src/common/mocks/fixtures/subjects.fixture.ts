import type { SubjectDto } from '$common/api/subjects/subjects.types'

export const subjectsFixture: SubjectDto[] = [
    {
        id: 'subject-1',
        name: 'Математика',
        created_at: '2026-01-01T00:00:00.000Z',
    },
    {
        id: 'subject-2',
        name: 'Информатика',
        created_at: '2026-01-02T00:00:00.000Z',
    },
]
