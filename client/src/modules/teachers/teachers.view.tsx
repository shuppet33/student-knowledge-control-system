import { Flex, Input, Select, Space } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { TeacherList } from '$modules/teachers/ui/teacher-list'
import { TeacherModal } from '$modules/teachers/ui/teacher-modal'

import { CreateTeacherPopover } from './ui/create-teacher-popover'
import { teachersResource } from './teachers.service'

import styles from './teachers.module.css'

const { Search } = Input

export const TeachersManagement = reatomComponent(({ ctx }) => {
    const teachers = ctx.spy(teachersResource.dataAtom)

    return (
        <>
            <Flex vertical gap={24}>
                <Space size={16} wrap>
                    <CreateTeacherPopover />
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
