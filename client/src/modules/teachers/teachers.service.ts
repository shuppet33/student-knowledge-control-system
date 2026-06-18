import {
    reatomAsync,
    reatomResource,
    withCache,
    withDataAtom,
    withStatusesAtom,
} from '@reatom/framework'

import {
    createSubject,
    getSubjects,
} from '$common/api/subjects/subjects.service'
import {
    assignSubjectToTeacher,
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
    selectedSubjectIdAtom,
    selectedTeacherAtom,
} from './teachers.state'

export const teachersResource = reatomResource(async () => {
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

    await teachersResource(ctx)

    closeCreateTeacherAction(ctx)
}, 'createTeacherAsync')

export const teacherSubjectsResource = reatomResource(async (ctx) => {
    const teacher = ctx.get(selectedTeacherAtom)

    if (!teacher) {
        return []
    }

    return await getTeacherSubjects(teacher.id)
}, 'teacherSubjectsResource').pipe(withDataAtom([]), withStatusesAtom())

export const subjectsResource = reatomResource(async () => {
    return await getSubjects()
}, 'subjectsResource').pipe(withDataAtom([]), withStatusesAtom())

export const assignSubjectToTeacherAsync = reatomAsync(async (ctx) => {
    const teacher = ctx.get(selectedTeacherAtom)
    const subjectId = ctx.get(selectedNewSubjectIdAtom)

    if (!teacher || !subjectId) {
        return
    }

    await assignSubjectToTeacher(teacher.id, { subjectId })
    await teacherSubjectsResource(ctx)
}, 'assignSubjectToTeacherAsync')

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
    await teacherSubjectsResource(ctx)
    await subjectsResource(ctx)
}, 'createSubjectAndAssignAsync')

export const teacherTestsResource = reatomResource(async (ctx) => {
    const teacher = ctx.spy(selectedTeacherAtom)
    const subjectId = ctx.spy(selectedSubjectIdAtom)

    if (!teacher || !subjectId) {
        return []
    }

    return await getTeacherTests(teacher.id, subjectId)
}, 'teacherTestsResource').pipe(
    withCache(),
    withDataAtom([]),
    withStatusesAtom(),
)
