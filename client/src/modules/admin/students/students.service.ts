import { notification } from 'antd'

import {
    action,
    reatomAsync,
    reatomResource,
    withDataAtom,
    withErrorAtom,
    withStatusesAtom,
} from '@reatom/framework'

import { studentCreatedAction } from '$modules/create-user-popover/create-user-popover.service'
import { createGroupAsync } from '$modules/admin/students/ui/create-group-popover/create-group-popover.service.ts'

import {
    addStudentsToGroup,
    deleteGroup,
    removeStudentFromGroup,
} from '$common/api/groups/groups.service'
import {
    getStudents,
    searchStudents,
} from '$common/api/students/students.service'
import { deleteUser } from '$common/api/users/users.service'

import {
    addStudentSearchAtom,
    resetAddStudentPopoverAction,
    selectedGroupKeyAtom,
} from './students.state'

export const studentsResource = reatomResource(async (ctx) => {
    ctx.spy(studentCreatedAction)
    ctx.spy(deleteStudentAsync.onFulfill)
    ctx.spy(createGroupAsync.onFulfill)
    ctx.spy(deleteGroupAsync.onFulfill)
    ctx.spy(removeStudentFromGroupAsync.onFulfill)
    ctx.spy(addStudentsToGroupAsync.onFulfill)

    return await getStudents()
}, 'studentsResource').pipe(withDataAtom([]), withStatusesAtom())

export const studentOptionsResource = reatomResource(async (ctx) => {
    const search = ctx.spy(addStudentSearchAtom)
    const selectedGroupKey = ctx.spy(selectedGroupKeyAtom)
    const studentGroups = ctx.spy(studentsResource.dataAtom)

    const selectedGroup = studentGroups.find((group) => {
        return (group.groupId ?? 'without-group') === selectedGroupKey
    })

    if (!selectedGroup?.groupId) {
        return []
    }

    return await searchStudents({
        search,
        excludedGroupId: selectedGroup.groupId,
        limit: 50,
    })
}, 'studentOptionsResource').pipe(withDataAtom([]), withStatusesAtom())

export const closeAddStudentPopoverAction = action((ctx) => {
    resetAddStudentPopoverAction(ctx)
    addStudentsToGroupAsync.errorAtom.reset(ctx)
    addStudentsToGroupAsync.statusesAtom.reset(ctx)
}, 'closeAddStudentPopoverAction')

export const deleteStudentAsync = reatomAsync((ctx, studentId: string) => {
    return ctx.schedule(async () => {
        await deleteUser(studentId)

        return studentId
    })
}, 'deleteStudentAsync').pipe(withStatusesAtom(), withErrorAtom())

export const deleteGroupAsync = reatomAsync((ctx, groupId: string) => {
    return ctx.schedule(async () => {
        await deleteGroup(groupId)

        return groupId
    })
}, 'deleteGroupAsync').pipe(withStatusesAtom(), withErrorAtom())

export const removeStudentFromGroupAsync = reatomAsync(
    (ctx, payload: { groupId: string; studentId: string }) => {
        return ctx.schedule(async () => {
            await removeStudentFromGroup(payload.groupId, payload.studentId)

            return payload
        })
    },
    'removeStudentFromGroupAsync'
).pipe(withStatusesAtom(), withErrorAtom())

export const addStudentsToGroupAsync = reatomAsync(
    (ctx, payload: { groupId: string; studentIds: string[] }) => {
        return ctx.schedule(async () => {
            await addStudentsToGroup(payload.groupId, {
                studentIds: payload.studentIds,
            })

            return payload
        })
    },
    'addStudentsToGroupAsync'
).pipe(withStatusesAtom(), withErrorAtom())

deleteGroupAsync.onReject.onCall((_ctx, error) => {
    notification.error({
        title: 'Ошибка удаления группы',
        description: error instanceof Error ? error.message : 'Неизвестная ошибка',
    })
})

removeStudentFromGroupAsync.onReject.onCall((_ctx, error) => {
    notification.error({
        title: 'Ошибка удаления студента из группы',
        description: error instanceof Error ? error.message : 'Неизвестная ошибка',
    })
})

addStudentsToGroupAsync.onReject.onCall((_ctx, error) => {
    notification.error({
        title: 'Ошибка добавления студента в группу',
        description: error instanceof Error ? error.message : 'Неизвестная ошибка',
    })
})
