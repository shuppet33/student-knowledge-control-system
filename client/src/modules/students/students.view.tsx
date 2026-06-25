import { useState } from 'react'

import { Empty, Input, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import { CreateUserPopover } from '$modules/create-user-popover'
import { CreateGroupPopover } from '$modules/students/ui/create-group-popover'

import type { StudentGroup } from '$common/api/students/students.types'

import { ButtonUI } from '$common/ui/button'
import { EntityCard } from '$common/ui/entity-card'

import { studentsResource } from './students.service'

import styles from './students.module.css'

const { Text } = Typography

const getGroupKey = (group: StudentGroup) => group.groupId ?? 'without-group'

export const StudentsManagement = reatomComponent(({ ctx }) => {
    const studentGroups = ctx.spy(studentsResource.dataAtom)
    const [selectedGroupKey, setSelectedGroupKey] = useState<string | null>(
        null,
    )

    const selectedGroup =
        studentGroups.find((group) => getGroupKey(group) === selectedGroupKey) ??
        null

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
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

                <section className={styles.section}>
                    <Text className={styles.sectionTitle}>Группы:</Text>

                    <div className={styles.groupList}>
                        {studentGroups.length === 0 ? (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description="Группы не найдены"
                            />
                        ) : (
                            studentGroups.map((group) => {
                                const groupKey = getGroupKey(group)
                                const isSelected = selectedGroupKey === groupKey

                                return (
                                    <ButtonUI
                                        key={groupKey}
                                        active={isSelected}
                                        className={styles.groupCard}
                                        onClick={() =>
                                            setSelectedGroupKey(groupKey)
                                        }
                                        onDelete={() => undefined}
                                    >
                                        {group.groupName}
                                    </ButtonUI>
                                )
                            })
                        )}
                    </div>
                </section>
            </aside>

            <main className={styles.content}>
                {!selectedGroup ? (
                    <div className={styles.placeholder}>Выберите группу</div>
                ) : (
                    <div className={styles.details}>
                        <label className={styles.nameField}>
                            <Text className={styles.sectionTitle}>Название:</Text>
                            <Input
                                key={getGroupKey(selectedGroup)}
                                className={styles.nameInput}
                                defaultValue={selectedGroup.groupName}
                                size="large"
                            />
                        </label>

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
                                selectedGroup.students.map((student) => (
                                    <EntityCard
                                        key={student.id}
                                        title={student.fullName}
                                        onDelete={() => undefined}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
})
