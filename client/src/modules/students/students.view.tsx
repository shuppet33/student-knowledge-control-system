import { Collapse, Empty, Flex, Input, Select, Space, Tag, Typography } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { CreateUserPopover } from '$modules/create-user-popover'
import { CreateGroupPopover } from '$modules/students/ui/create-group-popover'

import { EntityCard } from '$common/ui/entity-card'

import { deleteStudentAsync, studentsResource } from './students.service'

import styles from './students.module.css'

const { Search } = Input
const { Text } = Typography

export const StudentsManagement = reatomComponent(({ ctx }) => {
    const studentGroups = ctx.spy(studentsResource.dataAtom)

    const collapseItems = studentGroups.map((group) => ({
        key: group.groupId ?? 'without-group',
        label: (
            <Flex align="center" gap={8}>
                <Text strong>{group.groupName}</Text>
                <Tag>{group.students.length}</Tag>
            </Flex>
        ),
        children:
            group.students.length === 0 ? (
                <Empty description="Студентов нет" />
            ) : (
                <div className={styles.list}>
                    {group.students.map((student) => (
                        <EntityCard
                            key={student.id}
                            title={student.fullName}
                            onDelete={() => deleteStudentAsync(ctx, student.id)}
                        />
                    ))}
                </div>
            ),
    }))

    return (
        <>
            <Flex vertical gap={24}>
                <Space size={16} wrap>
                    <CreateUserPopover role="student" />

                    <CreateGroupPopover />

                    <Search placeholder="поиск студента" allowClear className={styles.filter} />

                    <Select placeholder="сортировка по группам" className={styles.filter} />
                </Space>

                <Collapse items={collapseItems} />
            </Flex>
        </>
    )
})
