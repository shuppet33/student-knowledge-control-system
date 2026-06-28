import { Flex, Input, Select, Space } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { CreateUserPopover } from '$modules/admin/create-user-popover'
import { TeacherList } from '$modules/admin/teachers/ui/teacher-list'
import { TeacherModal } from '$modules/admin/teachers/ui/teacher-modal'

import { teachersResource } from './teachers.service'

import styles from './teachers.module.css'

const { Search } = Input

export const TeachersManagement = reatomComponent(({ ctx }) => {
    const teachers = ctx.spy(teachersResource.dataAtom)

    return (
        <>
            <Flex vertical gap={24}>
                <Space size={16} wrap>
                    <CreateUserPopover role="teacher" />
                    <Search
                        placeholder="поиск преподавателя"
                        allowClear
                        className={styles.filter}
                    />

                    <Select
                        placeholder="сортировка по предметам"
                        className={styles.filter}
                    />
                </Space>

                <TeacherList teachers={teachers} />
            </Flex>

            <TeacherModal />
        </>
    )
})
