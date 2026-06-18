import { http, HttpResponse } from 'msw'

import { API_URL } from '$common/api/api.constants'

import { authFixture } from './fixtures/auth.fixture'
import { subjectsFixture } from './fixtures/subjects.fixture'
import { teacherTestsFixture } from './fixtures/teacher-tests.fixture'
import { teachersFixture } from './fixtures/teachers.fixture'
import type { CreateSubjectMockPayload } from './api-mocks.types'

export const apiHandlers = [
    http.post(`${API_URL}/auth/login`, () => {
        return HttpResponse.json(authFixture)
    }),
    http.post(`${API_URL}/auth/refresh`, () => {
        return HttpResponse.json(authFixture)
    }),
    http.post(`${API_URL}/auth/logout`, () => {
        return HttpResponse.json({ success: true })
    }),
    http.get(`${API_URL}/teachers`, () => {
        return HttpResponse.json(teachersFixture)
    }),
    http.post(`${API_URL}/users`, () => {
        return HttpResponse.json({ success: true }, { status: 201 })
    }),
    http.get(`${API_URL}/subjects`, () => {
        return HttpResponse.json(subjectsFixture)
    }),
    http.post(`${API_URL}/subjects`, async ({ request }) => {
        const payload =
            (await request.json()) as CreateSubjectMockPayload

        return HttpResponse.json(
            {
                id: crypto.randomUUID(),
                name: payload.name,
                created_at: new Date().toISOString(),
            },
            { status: 201 },
        )
    }),
    http.get(
        `${API_URL}/teachers/:teacherId/subjects`,
        () => {
            return HttpResponse.json(subjectsFixture)
        },
    ),
    http.post(
        `${API_URL}/teachers/:teacherId/subjects`,
        () => {
            return HttpResponse.json(
                { success: true },
                { status: 201 },
            )
        },
    ),
    http.get(
        `${API_URL}/teachers/:teacherId/subjects/:subjectId/tests`,
        () => {
            return HttpResponse.json(teacherTestsFixture)
        },
    ),
]
