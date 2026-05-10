import { API_URL } from '$entities/api'

import { subjectsMapper } from './subjects.mapper'
import {
    type Subject,
    type SubjectDto,
} from './subjects.types'

export const getSubjects = async (): Promise<
    Subject[]
> => {
    const response = await fetch(
        `${API_URL}/subjects`,
        {
            method: 'GET',
            credentials: 'include',
        },
    )

    if (!response.ok) {
        throw new Error(
            'Ошибка получения предметов',
        )
    }

    const data: SubjectDto[] =
        await response.json()

    return subjectsMapper(data)
}

export const createSubject = async (
    name: string,
): Promise<Subject> => {
    const response = await fetch(
        `${API_URL}/subjects`,
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type':
                    'application/json',
            },
            body: JSON.stringify({
                name,
            }),
        },
    )

    if (!response.ok) {
        throw new Error(
            'Ошибка создания предмета',
        )
    }

    const data: SubjectDto =
        await response.json()

    return {
        id: data.id,
        name: data.name,
        createdAt: data.created_at,
    }
}