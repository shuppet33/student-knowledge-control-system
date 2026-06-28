import {
    createBrowserRouter,
    type LoaderFunctionArgs,
    RouterProvider,
} from 'react-router'

import { StudentLayout } from '$app/layouts/student/student-layout.view'
import { TeacherLayout } from '$app/layouts/teacher/teacher-layout.view'

import { AdminPage } from '$pages/admin/admin.view'
import { AdminStudentsPage } from '$pages/admin/students/students.view'
import { AdminSubjectDetailsPage } from '$pages/admin/subject-details/subject-details.view'
import { AdminSubjectsPage } from '$pages/admin/subjects/subjects.view'
import { AdminTeachersPage } from '$pages/admin/teachers/teachers.view'
import { AdminTestsPage } from '$pages/admin/tests/tests.view'
import { MainPage } from '$pages/home/home.view'
import { SubjectTestsPage } from '$pages/student/subject-tests/subject-tests.view'
import { StudentPage } from '$pages/student/subjects/subjects.view'
import { TeacherSubjectDetailsPage } from '$pages/teacher/subject-details/subject-details.view'
import { TeacherPage } from '$pages/teacher/teacher.view.tsx'

import { getSubjectTests } from '$common/api/students/students.service'
import type { StudentSubjectTests } from '$common/api/students/students.types'

import { AdminLayout } from '../layouts/admin/admin-layout.view'

import { RoleGuard } from './role-guard/role-guard.view'

export type SubjectLoaderData = {
    subjectId: string
}

const subjectLoader = ({ params }: LoaderFunctionArgs): SubjectLoaderData => {
    return {
        subjectId: params.subjectId ?? '',
    }
}

export type StudentSubjectTestsLoaderData = StudentSubjectTests

const studentSubjectTestsLoader = async ({
    params,
}: LoaderFunctionArgs): Promise<StudentSubjectTestsLoaderData> => {
    return await getSubjectTests(params.subjectId ?? '')
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: '/admin',
        element: (
            <RoleGuard allowedRoles={['admin']}>
                <AdminLayout />
            </RoleGuard>
        ),
        children: [
            {
                index: true,
                element: <AdminPage />,
            },
            {
                path: 'teachers',
                element: <AdminTeachersPage />,
            },
            {
                path: 'students',
                element: <AdminStudentsPage />,
            },
            {
                path: 'subjects',
                element: <AdminSubjectsPage />,
            },
            {
                path: 'subjects/:subjectId',
                loader: subjectLoader,
                element: <AdminSubjectDetailsPage />,
            },
            {
                path: 'tests',
                element: <AdminTestsPage />,
            },
        ],
    },
    {
        path: '/teacher',
        element: (
            <RoleGuard allowedRoles={['teacher']}>
                <TeacherLayout />
            </RoleGuard>
        ),
        children: [
            {
                index: true,
                element: <TeacherPage />,
            },
            {
                path: ':subjectId',
                loader: subjectLoader,
                element: <TeacherSubjectDetailsPage />,
            },
        ],
    },
    {
        path: '/student',
        element: (
            <RoleGuard allowedRoles={['student']}>
                <StudentLayout />
            </RoleGuard>
        ),
        children: [
            {
                index: true,
                element: <StudentPage />,
            },
            {
                path: ':subjectId',
                loader: studentSubjectTestsLoader,
                element: <SubjectTestsPage />,
            },
        ],
    },
])

export const AppRouter = () => {
    return <RouterProvider router={router} />
}
