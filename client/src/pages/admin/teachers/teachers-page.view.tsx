import { Flex, Input, Select, Space } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { teachersResource } from './model/teachers.services.ts'
import { TeacherList } from './ui/teacher-list'
import { TeacherModal } from './ui/teacher-modal'

const { Search } = Input

export const TeachersPage = reatomComponent(({ ctx }) => {
    const teachers = ctx.spy(teachersResource.dataAtom)

    return (
        <>
            <Flex vertical gap={24}>
                <Space size={16} wrap>
                    <Search
                        placeholder="Поиск преподавателя"
                        allowClear
                        style={{
                            width: 260,
                        }}
                    />

                    <Select
                        placeholder="Сортировка по предметам"
                        style={{
                            width: 260,
                        }}
                    />
                </Space>

                <TeacherList teachers={teachers} />
            </Flex>

            <TeacherModal />
        </>
    )
})