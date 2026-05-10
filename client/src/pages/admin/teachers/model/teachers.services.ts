import {
    reatomAsync,
    reatomResource,
    withDataAtom,
    withStatusesAtom,
} from '@reatom/framework'

import {
    assignSubjectToTeacher,
    getTeacherSubjects,
} from '$shared/api/admin/ teacher-subjects/teacher-subjects.api.ts'
import {
    createSubject,
    getSubjects,
} from '$shared/api/admin/subjects/subjects.api.ts'
import { getTeachers } from '$shared/api/admin/teachers/teachers.api.ts'

import {
    newSubjectNameAtom,
    selectedNewSubjectIdAtom,
    selectedTeacherAtom,
} from './teachers.atoms.ts'

export const teachersResource = reatomResource(async () => {
    return await getTeachers()
}, 'teachersResource').pipe(withDataAtom([]), withStatusesAtom())

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

    await assignSubjectToTeacher(teacher.id, subjectId)

    await teacherSubjectsResource(ctx)
}, 'assignSubjectToTeacherAsync')

export const createSubjectAndAssignAsync = reatomAsync(async (ctx) => {
    const teacher = ctx.get(selectedTeacherAtom)

    const name = ctx.get(newSubjectNameAtom)

    if (!teacher || !name.trim()) {
        return
    }

    const subject = await createSubject(name)

    await assignSubjectToTeacher(teacher.id, subject.id)

    await teacherSubjectsResource(ctx)

    await subjectsResource(ctx)
}, 'createSubjectAndAssignAsync')
