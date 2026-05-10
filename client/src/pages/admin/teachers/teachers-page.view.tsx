import { Flex, Input, Select, Space } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { TeacherList } from '$features/admin/teachers/ teacher-list'
import { TeacherModal } from '$features/admin/teachers/ teacher-modal'
import { CreateTeacherPopover } from '$features/admin/teachers/create-teacher-popover/create-teacher-popover.tsx'

import { teachersResource } from '$entities/teachers/teachers.services.ts'

const { Search } = Input

export const TeachersPage = reatomComponent(({ ctx }) => {
    const teachers = ctx.spy(teachersResource.dataAtom)

    return (
        <>
            <Flex vertical gap={24}>
                <Space size={16} wrap>
                    <CreateTeacherPopover />
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
