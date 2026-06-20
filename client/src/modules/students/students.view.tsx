import { Flex, Input, Select, Space } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { CreateUserPopover } from '$modules/create-user-popover'

import { studentsResource } from './students.service'

import styles from './students.module.css'

const { Search } = Input

export const StudentsManagement = reatomComponent(({ ctx }) => {
    ctx.spy(studentsResource.dataAtom)

    return (
        <>
            <Flex vertical gap={24}>
                <Space size={16} wrap>
                    <CreateUserPopover role="student" />

                    <Search
                        placeholder="поиск студента"
                        allowClear
                        className={styles.filter}
                    />

                    <Select
                        placeholder="сортировка по группам"
                        className={styles.filter}
                    />
                </Space>
            </Flex>
        </>
    )
})
