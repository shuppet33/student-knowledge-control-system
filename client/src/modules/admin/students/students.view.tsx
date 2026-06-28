import { useMemo } from 'react'

import { Alert, Button, Card, Empty, Flex, Input, Select, Typography } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import clsx from 'clsx'

import { CreateUserPopover } from '$modules/admin/create-user-popover'
import { CreateGroupPopover } from '$modules/admin/students/ui/create-group-popover'
import {
    RolePageLayout,
    SidebarSection,
} from '$modules/role-page-layout'

import type { StudentGroup } from '$common/api/students/students.types'
import { ButtonUI } from '$common/ui/button'
import { EntityCard } from '$common/ui/entity-card'

import {
    addStudentsToGroupAsync,
    closeAddStudentPopoverAction,
    deleteGroupAsync,
    removeStudentFromGroupAsync,
    studentOptionsResource,
    studentsResource,
} from './students.service'
import {
    debouncedAddStudentSearchAction,
    isAddStudentOpenAtom,
    selectedGroupKeyAtom,
    selectedStudentIdsAtom,
} from './students.state'

import styles from './students.module.css'

const { Text } = Typography

const getGroupKey = (group: StudentGroup) => group.groupId ?? 'without-group'

export const StudentsManagement = reatomComponent(({ ctx }) => {
    const studentGroups = ctx.spy(studentsResource.dataAtom)
    const studentOptions = ctx.spy(studentOptionsResource.dataAtom)
    const { isPending: isLoadingStudentOptions } = ctx.spy(
        studentOptionsResource.statusesAtom
    )
    const { isPending: isAddingStudents } = ctx.spy(addStudentsToGroupAsync.statusesAtom)
    const addStudentsError = ctx.spy(addStudentsToGroupAsync.errorAtom)

    const selectedGroupKey = ctx.spy(selectedGroupKeyAtom)
    const isAddStudentOpen = ctx.spy(isAddStudentOpenAtom)
    const selectedStudentIds = ctx.spy(selectedStudentIdsAtom)
    const visibleStudentGroups = useMemo(() => {
        return studentGroups.filter((group) => {
            return group.groupId || group.students.length > 0
        })
    }, [studentGroups])

    const selectedGroup =
        visibleStudentGroups.find((group) => getGroupKey(group) === selectedGroupKey) ?? null
    const isWithoutGroupSelected = selectedGroup?.groupId === null

    return (
        <RolePageLayout
            stretch
            sidebar={(
                <>
                <Input
                    placeholder="поиск"
                    prefix={<SearchOutlined />}
                    size="large"
                    className={styles.groupSearch}
                />

                <div className={styles.actions}>
                    <CreateUserPopover role="student" />
                    <CreateGroupPopover />
                </div>

                <SidebarSection title="Группы:" grow>
                    <div className={styles.groupList}>
                        {visibleStudentGroups.length === 0 ? (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description="Группы не найдены"
                            />
                        ) : (
                            visibleStudentGroups.map((group) => {
                                const groupKey = getGroupKey(group)
                                const isSelected = selectedGroupKey === groupKey

                                return (
                                    <>
                                        {!group.groupId && (
                                            <ButtonUI
                                                key={groupKey}
                                                active={isSelected}
                                                className={clsx(
                                                    styles.groupCard,
                                                    styles.withoutGroupCard,
                                                    isSelected &&
                                                        styles.withoutGroupCardActive
                                                )}
                                                onClick={() =>
                                                    selectedGroupKeyAtom(ctx, groupKey)
                                                }
                                            >
                                                {group.groupName}
                                            </ButtonUI>
                                        )}

                                        {group.groupId && (
                                            <ButtonUI
                                                key={groupKey}
                                                active={isSelected}
                                                className={styles.groupCard}
                                                onClick={() =>
                                                    selectedGroupKeyAtom(ctx, groupKey)
                                                }
                                                onDelete={() =>
                                                    deleteGroupAsync(ctx, group.groupId!)
                                                }
                                            >
                                                {group.groupName}
                                            </ButtonUI>
                                        )}
                                    </>
                                )
                            })
                        )}
                    </div>
                </SidebarSection>
                </>
            )}
        >

                {!selectedGroup ? (
                    <div className={styles.placeholder}>Выберите группу</div>
                ) : (
                    <div className={styles.details}>
                        <div className={styles.detailsHeader}>
                            <label className={styles.nameField}>
                                <Text className={styles.sectionTitle}>Название:</Text>
                                <Input
                                    key={getGroupKey(selectedGroup)}
                                    className={styles.nameInput}
                                    defaultValue={selectedGroup.groupName}
                                    size="large"
                                    disabled={isWithoutGroupSelected}
                                />
                            </label>

                            {selectedGroup.groupId && (
                                <div className={styles.addStudentWrapper}>
                                    {isAddStudentOpen && (
                                        <div
                                            className={styles.overlay}
                                            onClick={() =>
                                                closeAddStudentPopoverAction(ctx)
                                            }
                                        />
                                    )}

                                    <Button
                                        icon={<PlusOutlined />}
                                        size="large"
                                        type="primary"
                                        className={clsx(
                                            isAddStudentOpen && styles.activeButton
                                        )}
                                        onClick={() =>
                                            isAddStudentOpenAtom(ctx, true)
                                        }
                                    >
                                        добавить студента
                                    </Button>

                                    {isAddStudentOpen && (
                                        <Card className={styles.addStudentCard}>
                                            <Flex vertical gap={20}>
                                                <Text className={styles.addStudentDescription}>
                                                    выберите студентов из списка
                                                </Text>

                                                <Select
                                                    mode="multiple"
                                                    showSearch
                                                    filterOption={false}
                                                    onSearch={(value) =>
                                                        debouncedAddStudentSearchAction(
                                                            ctx,
                                                            value
                                                        )
                                                    }
                                                    virtual
                                                    size="large"
                                                    placeholder="выбор студентов"
                                                    value={selectedStudentIds}
                                                    disabled={isAddingStudents}
                                                    loading={isLoadingStudentOptions}
                                                    options={studentOptions.map((student) => ({
                                                        value: student.id,
                                                        label: student.fullName,
                                                    }))}
                                                    onChange={(studentIds) =>
                                                        selectedStudentIdsAtom(ctx, studentIds)
                                                    }
                                                    styles={{
                                                        content: {
                                                            maxHeight: '116px',
                                                            overflowY: 'auto',
                                                            boxSizing: 'border-box',
                                                            width: '100%',
                                                        },
                                                    }}
                                                />

                                                <Button
                                                    type="primary"
                                                    size="large"
                                                    loading={isAddingStudents}
                                                    disabled={selectedStudentIds.length === 0}
                                                    onClick={async () => {
                                                        await addStudentsToGroupAsync(ctx, {
                                                            groupId: selectedGroup.groupId!,
                                                            studentIds: selectedStudentIds,
                                                        })
                                                        closeAddStudentPopoverAction(ctx)
                                                    }}
                                                >
                                                    добавить
                                                </Button>

                                                {addStudentsError && (
                                                    <Alert
                                                        type="error"
                                                        showIcon
                                                        title={addStudentsError.message}
                                                    />
                                                )}
                                            </Flex>
                                        </Card>
                                    )}
                                </div>
                            )}
                        </div>

                        <Input
                            placeholder="поиск"
                            prefix={<SearchOutlined />}
                            size="large"
                            className={styles.studentSearch}
                        />

                        <div className={styles.studentList}>
                            {selectedGroup.students.length === 0 ? (
                                <Empty description="Студенты не найдены" />
                            ) : (
                                selectedGroup.students.map((student) => {
                                    return (
                                        <>
                                            {!selectedGroup.groupId && (
                                                <EntityCard
                                                    key={student.id}
                                                    title={student.fullName}
                                                />
                                            )}

                                            {selectedGroup.groupId && (
                                                <EntityCard
                                                    key={student.id}
                                                    title={student.fullName}
                                                    onDelete={() =>
                                                        removeStudentFromGroupAsync(ctx, {
                                                            groupId: selectedGroup.groupId!,
                                                            studentId: student.id,
                                                        })
                                                    }
                                                />
                                            )}
                                        </>
                                    )
                                })
                            )}
                        </div>
                    </div>
                )}
        </RolePageLayout>
    )
})
