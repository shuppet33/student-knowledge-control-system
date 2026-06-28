import { notification } from 'antd'

import {
    reatomAsync,
    reatomResource,
    withCache,
    withDataAtom,
    withErrorAtom,
    withStatusesAtom,
} from '@reatom/framework'

import { teacherCreatedAction } from '$modules/admin/create-user-popover/create-user-popover.service'

import { createSubject, getSubjects } from '$common/api/subjects/subjects.service'
import {
    assignSubjectToTeacher,
    deleteTeacherSubject,
    getTeacherSubjects,
} from '$common/api/teacher-subjects/teacher-subjects.service'
import { getTeacherTests } from '$common/api/teacher-tests/teacher-tests.service'
import { getTeachers } from '$common/api/teachers/teachers.service'
import { deleteTest } from '$common/api/tests/tests.service'
import { deleteUser } from '$common/api/users/users.service'

import {
    newSubjectNameAtom,
    selectedNewSubjectIdAtom,
    selectedSubjectAtom,
    selectedTeacherAtom,
} from './teachers.state'

export const teachersResource = reatomResource(async (ctx) => {
    ctx.spy(teacherCreatedAction)
    ctx.spy(deleteTeacherAsync.onFulfill)

    return await getTeachers()
}, 'teachersResource').pipe(withDataAtom([]), withStatusesAtom())

export const deleteTeacherAsync = reatomAsync(
    (ctx, teacherId: string) => {
        return ctx.schedule(async () => {
            await deleteUser(teacherId)

            return teacherId
        })
    },
    'deleteTeacherAsync',
).pipe(withStatusesAtom(), withErrorAtom())

export const teacherSubjectsResource = reatomResource(async (ctx) => {
    ctx.spy(deleteTeacherSubjectAsync.onFulfill)
    ctx.spy(assignSubjectToTeacherAsync.onFulfill)
    ctx.spy(createSubjectAndAssignAsync.onFulfill)

    const teacher = ctx.spy(selectedTeacherAtom)

    if (!teacher) {
        return []
    }

    return await getTeacherSubjects(teacher.id)
}, 'teacherSubjectsResource').pipe(withDataAtom([]), withStatusesAtom())

export const subjectsResource = reatomResource(async (ctx) => {
    ctx.spy(createSubjectAndAssignAsync.onFulfill)

    return await getSubjects()
}, 'subjectsResource').pipe(withDataAtom([]), withStatusesAtom())

export const assignSubjectToTeacherAsync = reatomAsync((ctx) => {
    return ctx.schedule(async () => {
        const teacher = ctx.get(selectedTeacherAtom)
        const subjectId = ctx.get(selectedNewSubjectIdAtom)

        if (!teacher || !subjectId) {
            return
        }

        await assignSubjectToTeacher(teacher.id, { subjectId })
    })
}, 'assignSubjectToTeacherAsync').pipe(withStatusesAtom(), withErrorAtom())

export const createSubjectAndAssignAsync = reatomAsync((ctx) => {
    return ctx.schedule(async () => {
        const teacher = ctx.get(selectedTeacherAtom)
        const name = ctx.get(newSubjectNameAtom)

        if (!teacher || !name.trim()) {
            return
        }

        const subject = await createSubject({ name })

        await assignSubjectToTeacher(teacher.id, {
            subjectId: subject.id,
        })
    })
}, 'createSubjectAndAssignAsync').pipe(withStatusesAtom(), withErrorAtom())

export const teacherTestsResource = reatomResource(async (ctx) => {
    ctx.spy(deleteTeacherTestAsync.onFulfill)

    const teacher = ctx.spy(selectedTeacherAtom)
    const subject = ctx.spy(selectedSubjectAtom)

    if (!teacher || (!subject.id && !subject.name)) {
        return []
    }

    return await getTeacherTests(teacher.id, subject.id)
}, 'teacherTestsResource').pipe(withCache(), withDataAtom([]), withStatusesAtom())

export const deleteTeacherTestAsync = reatomAsync(
    (ctx, testId: string) => {
        return ctx.schedule(async () => {
            await deleteTest(testId)

            return testId
        })
    },
    'deleteTeacherTestAsync',
).pipe(withStatusesAtom(), withErrorAtom())

export const deleteTeacherSubjectAsync = reatomAsync((ctx, subjectId: string) => {
    return ctx.schedule(async () => {
        const teacher = ctx.get(selectedTeacherAtom)

        if (!teacher) {
            throw new Error('Отсутствует id преподавателя')
        }

        return await deleteTeacherSubject(teacher.id, subjectId)
    })
}).pipe(withStatusesAtom(), withErrorAtom())

deleteTeacherSubjectAsync.onReject.onCall((_ctx, error) => {
    notification.error({
        title: 'Ошибка удаления предмета',
        description: error instanceof Error ? error.message : 'Неизвестная ошибка',
    })
})

deleteTeacherTestAsync.onReject.onCall((_ctx, error) => {
    notification.error({
        title: 'Ошибка удаления теста',
        description:
            error instanceof Error ? error.message : 'Неизвестная ошибка',
    })
})

deleteTeacherAsync.onReject.onCall((_ctx, error) => {
    notification.error({
        title: 'Ошибка удаления преподавателя',
        description:
            error instanceof Error ? error.message : 'Неизвестная ошибка',
    })
})
