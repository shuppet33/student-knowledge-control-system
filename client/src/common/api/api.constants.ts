export const API_URL = 'http://localhost:3000'

export const API_ROUTES = {
    auth: {
        login: '/auth/login',
        logout: '/auth/logout',
        refresh: '/auth/refresh',
    },
    subjects: '/subjects',
    teachers: '/teachers',
    users: '/users',
    teacherSubjects: (teacherId: string) =>
        `/teachers/${teacherId}/subjects`,
    teacherTests: (teacherId: string, subjectId: string) =>
        `/teachers/${teacherId}/subjects/${subjectId}/tests`,
} as const
