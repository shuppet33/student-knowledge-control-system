import { useEffect } from 'react'

import { Input, Select, Spin, Typography } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { useParams } from 'react-router'

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
    initializeSubjectDetailsAction,
    selectedGroupIdsAtom,
    selectedTeacherIdsAtom,
    setSelectedGroupIdsAction,
    setSelectedTeacherIdsAction,
    subjectNameAtom,
} from './subject-details.state'

import styles from './subject-details.module.css'

const { Text } = Typography
const { TextArea } = Input

export const SubjectDetails = reatomComponent(({ ctx }) => {
    const { subjectId } = useParams()

    const subject = ctx.spy(subjectResource.dataAtom)
    const subjectName = ctx.spy(subjectNameAtom)
    ctx.spy(subjectGroupsResource.dataAtom)
    ctx.spy(subjectTeachersResource.dataAtom)
    // const groups = ctx.spy(subjectGroupsResource.dataAtom)
    // const teachers = ctx.spy(subjectTeachersResource.dataAtom)
    const allGroups = ctx.spy(allGroupsResource.dataAtom)
    const allTeachers = ctx.spy(allTeachersResource.dataAtom)

    const selectedGroupIds = ctx.spy(selectedGroupIdsAtom)
    const selectedTeacherIds = ctx.spy(selectedTeacherIdsAtom)

    const { isPending: isLoadingSubject } = ctx.spy(
        subjectResource.statusesAtom,
    )
    const { isPending: isSavingGroups } = ctx.spy(
        saveSubjectGroupsAsync.statusesAtom,
    )
    const { isPending: isSavingTeachers } = ctx.spy(
        saveSubjectTeachersAsync.statusesAtom,
    )

    useEffect(() => {
        if (subjectId) {
            initializeSubjectDetailsAction(ctx, subjectId)
        }
    }, [ctx, subjectId])

    if (isLoadingSubject && !subject) {
        return <Spin />
    }

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <section>
                    <Text className={styles.sectionTitle}>
                        Название предмета
                    </Text>
                    <TextArea
                        className={styles.nameInput}
                        value={subjectName}
                        onChange={(event) =>
                            changeSubjectNameAction(ctx, event.target.value)
                        }
                    />
                </section>

                <section className={styles.section}>
                    <Text className={styles.sectionTitle}>
                        Доступность групп
                    </Text>

                    {/* <div className={styles.relationList}>
                        {groups.map((group) => (
                            <div
                                key={group.id}
                                className={styles.relationItem}
                            >
                                <span>{group.name}</span>
                            </div>
                        ))}
                    </div>

                    <RelationPopover
                        items={allGroups}
                        selectedIds={selectedGroupIds}
                        isOpen={isGroupsOpen}
                        isSaving={isSavingGroups}
                        onOpen={() => openGroupsPopoverAction(ctx, groups)}
                        onClose={() => closeGroupsPopoverAction(ctx)}
                        onToggle={(id) => toggleGroupAction(ctx, id)}
                        onSave={() => saveSubjectGroupsAsync(ctx)}
                    /> */}

                    <Select
                        mode="multiple"
                        className={styles.relationSelect}
                        virtual
                        showSearch={{ optionFilterProp: 'label' }}
                        style={{
                            maxHeight: '100px',
                            overflowY: 'auto',
                            boxSizing: 'border-box',
                            width: '100%',
                        }}
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
                    <Text className={styles.sectionTitle}>
                        Преподаватели
                    </Text>

                    {/* <div className={styles.relationList}>
                        {teachers.map((teacher) => (
                            <div
                                key={teacher.id}
                                className={styles.relationItem}
                            >
                                <span>{teacher.fullName}</span>
                            </div>
                        ))}
                    </div>

                    <RelationPopover
                        items={allTeachers.map((teacher) => ({
                            id: teacher.id,
                            name: teacher.fullName,
                        }))}
                        selectedIds={selectedTeacherIds}
                        isOpen={isTeachersOpen}
                        isSaving={isSavingTeachers}
                        onOpen={() =>
                            openTeachersPopoverAction(ctx, teachers)
                        }
                        onClose={() => closeTeachersPopoverAction(ctx)}
                        onToggle={(id) => toggleTeacherAction(ctx, id)}
                        onSave={() => saveSubjectTeachersAsync(ctx)}
                    /> */}

                    <Select
                        styles={{content: {
                                maxHeight: '118px',
                                overflowY: 'auto',
                                boxSizing: 'border-box',
                                width: '100%',
                            }}}
                        mode="multiple"
                        className={styles.relationSelect}
                        showSearch={{ optionFilterProp: 'label' }}
                        virtual
                        style={{
                            maxHeight: '120px',
                            boxSizing: 'border-box',
                            width: '100%',
                        }}
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
