import { Spin } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import {
    RelationSelect,
    RolePageLayout,
    SubjectNameEditor,
} from '$modules/role-page-layout'

import {
    allGroupsResource,
    allTeachersResource,
    changeSubjectNameAction,
    saveSubjectGroupsAsync,
    saveSubjectTeachersAsync,
    subjectGroupsResource,
    subjectResource,
    subjectTeachersResource,
} from './subject-details.service'
import {
    selectedGroupIdsAtom,
    selectedTeacherIdsAtom,
    subjectIdAtom,
    subjectNameAtom,
} from './subject-details.state'

type SubjectDetailsProps = {
    subjectId: string
}

export const SubjectDetails = reatomComponent<SubjectDetailsProps>(({
    ctx,
    subjectId,
}) => {
    const subject = ctx.spy(subjectResource.dataAtom)
    const subjectName = ctx.spy(subjectNameAtom)

    ctx.spy(subjectGroupsResource.dataAtom)
    ctx.spy(subjectTeachersResource.dataAtom)

    const allGroups = ctx.spy(allGroupsResource.dataAtom)
    const allTeachers = ctx.spy(allTeachersResource.dataAtom)

    const selectedGroupIds = ctx.spy(selectedGroupIdsAtom)
    const selectedTeacherIds = ctx.spy(selectedTeacherIdsAtom)

    const { isPending: isLoadingSubject } = ctx.spy(subjectResource.statusesAtom)
    const { isPending: isSavingGroups } = ctx.spy(
        saveSubjectGroupsAsync.statusesAtom,
    )
    const { isPending: isSavingTeachers } = ctx.spy(
        saveSubjectTeachersAsync.statusesAtom,
    )

    if (ctx.get(subjectIdAtom) !== subjectId) {
        subjectIdAtom(ctx, subjectId)
    }

    if ((isLoadingSubject && !subject) || subject?.id !== subjectId) {
        return <Spin />
    }

    return (
        <RolePageLayout
            sidebar={(
                <>
                    <SubjectNameEditor
                        title="Название предмета"
                        value={subjectName}
                        onChange={(value) => changeSubjectNameAction(ctx, value)}
                    />

                    <RelationSelect
                        title="Доступность групп"
                        placeholder="Выберите группы"
                        value={selectedGroupIds}
                        loading={isSavingGroups}
                        onChange={(groupIds) => {
                            selectedGroupIdsAtom(ctx, groupIds)
                            saveSubjectGroupsAsync(ctx, false)
                        }}
                        options={allGroups.map((group) => ({
                            value: group.id,
                            label: group.name,
                        }))}
                    />

                    <RelationSelect
                        title="Преподаватели"
                        placeholder="Выберите преподавателей"
                        value={selectedTeacherIds}
                        loading={isSavingTeachers}
                        onChange={(teacherIds) => {
                            selectedTeacherIdsAtom(ctx, teacherIds)
                            saveSubjectTeachersAsync(ctx, false)
                        }}
                        options={allTeachers.map((teacher) => ({
                            value: teacher.id,
                            label: teacher.fullName,
                        }))}
                    />
                </>
            )}
        >
            {null}
        </RolePageLayout>
    )
})
