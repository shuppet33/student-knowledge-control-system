import { Button, Input, Modal, Select, Spin, Typography } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { useLoaderData } from 'react-router'

import type { SubjectLoaderData } from '$app/router/router.view'

import {
    changeSubjectNameAction,
    saveTeacherSubjectGroupsAsync,
    teacherGroupsResource,
    teacherSubjectGroupsResource,
    teacherSubjectResource,
} from '$pages/teacher/model/teacher.service'
import {
    closeCreateTestModalAction,
    isCreateTestModalOpenAtom,
    openCreateTestModalAction,
    selectedGroupIdsAtom,
    setSelectedGroupIdsAction,
    subjectIdAtom,
    subjectNameAtom,
} from '$pages/teacher/model/teacher.state'

import styles from './subject-details.module.css'

const { Text } = Typography
const { TextArea } = Input

type TeacherSubjectDetailsProps = {
    subjectId: string
}

const TeacherSubjectDetails = reatomComponent<TeacherSubjectDetailsProps>(({
    ctx,
    subjectId,
}) => {
    if (ctx.get(subjectIdAtom) !== subjectId) {
        subjectIdAtom(ctx, subjectId)
    }

    const subject = ctx.spy(teacherSubjectResource.dataAtom)
    const subjectName = ctx.spy(subjectNameAtom)

    ctx.spy(teacherSubjectGroupsResource.dataAtom)

    const allGroups = ctx.spy(teacherGroupsResource.dataAtom)
    const selectedGroupIds = ctx.spy(selectedGroupIdsAtom)
    const isCreateTestModalOpen = ctx.spy(isCreateTestModalOpenAtom)

    const { isPending: isLoadingSubject } = ctx.spy(
        teacherSubjectResource.statusesAtom,
    )
    const { isPending: isSavingGroups } = ctx.spy(
        saveTeacherSubjectGroupsAsync.statusesAtom,
    )

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
                        onChange={(event) =>
                            changeSubjectNameAction(ctx, event.target.value)
                        }
                    />
                </section>

                <section className={styles.section}>
                    <Button
                        type="primary"
                        size="large"
                        block
                        onClick={() => openCreateTestModalAction(ctx)}
                    >
                        Добавить тест
                    </Button>
                </section>

                <section className={styles.section}>
                    <Text className={styles.sectionTitle}>Доступность группы</Text>

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
                            saveTeacherSubjectGroupsAsync(ctx)
                        }}
                        options={allGroups.map((group) => ({
                            value: group.id,
                            label: group.name,
                        }))}
                    />
                </section>
            </aside>

            <main className={styles.content} />

            <Modal
                open={isCreateTestModalOpen}
                title="Добавить тест"
                footer={null}
                onCancel={() => closeCreateTestModalAction(ctx)}
            />
        </div>
    )
})

export const TeacherSubjectDetailsPage = () => {
    const { subjectId } = useLoaderData<SubjectLoaderData>()

    if (!subjectId) {
        return null
    }

    return <TeacherSubjectDetails subjectId={subjectId} key={subjectId} />
}
