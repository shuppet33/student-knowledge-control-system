import { Route, Routes } from 'react-router'

import { AdminPage } from '$pages/admin/admin.view'
import { AdminTeachersPage } from '$pages/admin/teachers/teachers.view'
import { MainPage } from '$pages/home/home.view'
import { StudentPage } from '$pages/student/student.view'
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
                        <StudentPage />
                    </RoleGuard>
                }
            />
        </Routes>
    )
}
