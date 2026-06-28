import { Input, Select, Spin, Typography } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

// import { RelationPopover } from './relation-popover.view'
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
    setSelectedGroupIdsAction,
    setSelectedTeacherIdsAction, subjectIdAtom,
    subjectNameAtom,
} from './subject-details.state'

import styles from './subject-details.module.css'

const { Text } = Typography
const { TextArea } = Input

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
    const { isPending: isSavingGroups } = ctx.spy(saveSubjectGroupsAsync.statusesAtom)
    const { isPending: isSavingTeachers } = ctx.spy(saveSubjectTeachersAsync.statusesAtom)

    if (ctx.get(subjectIdAtom) !== subjectId) {
        subjectIdAtom(ctx, subjectId)
    }

    if ((isLoadingSubject && !subject) || subject?.id !== subjectId) {
        return <Spin />
    }

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <section>
                    <Text className={styles.sectionTitle}>Название предмета</Text>
                    <TextArea
                        className={styles.nameInput}
                        value={subjectName}
                        onChange={(event) => changeSubjectNameAction(ctx, event.target.value)}
                    />
                </section>

                <section className={styles.section}>
                    <Text className={styles.sectionTitle}>Доступность групп</Text>

                    <Select
                        suffixIcon={false}
                        mode="multiple"
                        className={styles.relationSelect}
                        virtual
                        styles={{
                            content: {
                                maxHeight: '116px',
                                overflowY: 'auto',
                                boxSizing: 'border-box',
                                width: '100%',
                            },
                        }}
                        showSearch={{ optionFilterProp: 'label' }}
                        placeholder="Выберите группы"
                        value={selectedGroupIds}
                        loading={isSavingGroups}
                        onChange={(groupIds) => {
                            setSelectedGroupIdsAction(ctx, groupIds)
                            saveSubjectGroupsAsync(ctx, false)
                        }}
                        options={allGroups.map((group) => ({
                            value: group.id,
                            label: group.name,
                        }))}
                    />
                </section>

                <section className={styles.section}>
                    <Text className={styles.sectionTitle}>Преподаватели</Text>

                    <Select
                        suffixIcon={false}
                        styles={{
                            content: {
                                maxHeight: '116px',
                                overflowY: 'auto',
                                boxSizing: 'border-box',
                                width: '100%',
                            },
                        }}
                        mode="multiple"
                        className={styles.relationSelect}
                        showSearch={{ optionFilterProp: 'label' }}
                        virtual
                        placeholder="Выберите преподавателей"
                        value={selectedTeacherIds}
                        loading={isSavingTeachers}
                        onChange={(teacherIds) => {
                            setSelectedTeacherIdsAction(ctx, teacherIds)
                            saveSubjectTeachersAsync(ctx, false)
                        }}
                        options={allTeachers.map((teacher) => ({
                            value: teacher.id,
                            label: teacher.fullName,
                        }))}
                    />
                </section>
            </aside>

            <main className={styles.content} />
        </div>
    )
})
