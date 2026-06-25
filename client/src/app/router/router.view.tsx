import { Route, Routes } from 'react-router'

import { StudentLayout } from '$app/layouts/student/student-layout.view.tsx'

import { AdminPage } from '$pages/admin/admin.view'
import { AdminStudentsPage } from '$pages/admin/students/students.view'
import { AdminSubjectDetailsPage } from '$pages/admin/subject-details/subject-details.view'
import { AdminSubjectsPage } from '$pages/admin/subjects/subjects.view'
import { AdminTeachersPage } from '$pages/admin/teachers/teachers.view'
import { AdminTestsPage } from '$pages/admin/tests/tests.view'
import { MainPage } from '$pages/home/home.view'
import { StudentPage } from '$pages/student/subjects/subjects.view.tsx'
import { SubjectTestsPage } from '$pages/student/subject-tests/subject-tests.view.tsx'
import { TeacherPage } from '$pages/teacher/teacher.view'

import { AdminLayout } from '../layouts/admin/admin-layout.view'

import { RoleGuard } from './role-guard/role-guard.view'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />

            <Route
                path="/admin"
                element={
                    <RoleGuard allowedRoles={['admin']}>
                        <AdminLayout />
                    </RoleGuard>
                }
            >
                <Route index element={<AdminPage />} />
                <Route path="teachers" element={<AdminTeachersPage />} />
                <Route path="students" element={<AdminStudentsPage />} />
                <Route path="subjects" element={<AdminSubjectsPage />} />
                <Route path="subjects/:subjectId" element={<AdminSubjectDetailsPage />} />
                <Route path="tests" element={<AdminTestsPage />} />
            </Route>

            <Route
                path="/teacher"
                element={
                    <RoleGuard allowedRoles={['teacher']}>
                        <TeacherPage />
                    </RoleGuard>
                }
            />

            <Route
                path="/student"
                element={
                    <RoleGuard allowedRoles={['student']}>
                        <StudentLayout />
                    </RoleGuard>
                }
            >
                <Route index element={<StudentPage />} />
                <Route path=":subjectId" element={<SubjectTestsPage />} />
            </Route>
        </Routes>
    )
}
