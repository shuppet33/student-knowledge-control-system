import { notification } from 'antd'

import {
    reatomAsync,
    reatomResource,
    withCache,
    withDataAtom,
    withErrorAtom,
    withStatusesAtom,
} from '@reatom/framework'

import {
    createSubject,
    getSubjects,
} from '$common/api/subjects/subjects.service'
import {
    assignSubjectToTeacher, deleteTeacherSubject,
    getTeacherSubjects,
} from '$common/api/teacher-subjects/teacher-subjects.service'
import { getTeacherTests } from '$common/api/teacher-tests/teacher-tests.service'
import {
    createTeacher,
    getTeachers,
} from '$common/api/teachers/teachers.service'

import {
    closeCreateTeacherAction,
    createTeacherFormAtom,
    newSubjectNameAtom,
    selectedNewSubjectIdAtom,
    selectedSubjectAtom,
    selectedTeacherAtom,
} from './teachers.state'

export const teachersResource = reatomResource(async (ctx) => {
    ctx.spy(createTeacherAsync.onFulfill)

    return await getTeachers()
}, 'teachersResource').pipe(withDataAtom([]), withStatusesAtom())

export const createTeacherAsync = reatomAsync(async (ctx) => {
    const form = ctx.get(createTeacherFormAtom)

    if (form.password !== form.repeatPassword) {
        throw new Error('пароли не совпадают')
    }

    await createTeacher({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
    })

    closeCreateTeacherAction(ctx)
}, 'createTeacherAsync')

export const teacherSubjectsResource = reatomResource(async (ctx) => {
    ctx.spy(deleteTeacherSubjectAsync.onFulfill)
    ctx.spy(assignSubjectToTeacherAsync.onFulfill)
    ctx.spy(createSubjectAndAssignAsync.onFulfill)

    const teacher = ctx.get(selectedTeacherAtom)

    if (!teacher) {
        return []
    }

    return await getTeacherSubjects(teacher.id)
}, 'teacherSubjectsResource').pipe(withDataAtom([]), withStatusesAtom())

export const subjectsResource = reatomResource(async (ctx) => {
    ctx.spy(createSubjectAndAssignAsync.onFulfill)

    return await getSubjects()
}, 'subjectsResource').pipe(withDataAtom([]), withStatusesAtom())

export const assignSubjectToTeacherAsync = reatomAsync(async (ctx) => {
    const teacher = ctx.get(selectedTeacherAtom)
    const subjectId = ctx.get(selectedNewSubjectIdAtom)

    if (!teacher || !subjectId) {
        return
    }

    await assignSubjectToTeacher(teacher.id, { subjectId })
}, 'assignSubjectToTeacherAsync').pipe(withStatusesAtom(), withErrorAtom())

export const createSubjectAndAssignAsync = reatomAsync(async (ctx) => {
    const teacher = ctx.get(selectedTeacherAtom)
    const name = ctx.get(newSubjectNameAtom)

    if (!teacher || !name.trim()) {
        return
    }

    const subject = await createSubject({ name })

    await assignSubjectToTeacher(teacher.id, {
        subjectId: subject.id,
    })
}, 'createSubjectAndAssignAsync').pipe(withStatusesAtom(), withErrorAtom())

export const teacherTestsResource = reatomResource(async (ctx) => {
    const teacher = ctx.spy(selectedTeacherAtom)
    const subject = ctx.spy(selectedSubjectAtom)

    if (!teacher || (!subject.id && !subject.name)) {
        return []
    }

    return await getTeacherTests(teacher.id, subject.id)
}, 'teacherTestsResource').pipe(
    withCache(),
    withDataAtom([]),
    withStatusesAtom(),
)

export const deleteTeacherSubjectAsync = reatomAsync((ctx, subjectId: string ) => {
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
