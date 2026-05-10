import { Card, Flex, Input, Select, Space, Typography } from 'antd'
import { reatomComponent } from '@reatom/npm-react'
import { teachersResource } from '$pages/admin/teachers.services.ts'

const { Search } = Input
const { Title } = Typography

export const TeachersPage = reatomComponent(({ ctx }) => {
    const teachers = ctx.spy(teachersResource.dataAtom)
    const { isPending, isRejected } = ctx.spy(teachersResource.statusesAtom)

    console.log('LOOOG', teachers)

    return (
        <Flex
            vertical
            gap={24}
            style={{
                width: '100%',
            }}
        >
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
                    options={[
                        {
                            value: 'math',
                            label: 'Математика',
                        },
                        {
                            value: 'programming',
                            label: 'Программирование',
                        },
                    ]}
                />
            </Space>

            <Flex wrap gap={16}>
                {teachers.map((teacher) => (
                    <Card
                        key={teacher.id}
                        hoverable
                        size="small"
                        style={{
                            width: 180,
                            cursor: 'pointer',
                        }}
                    >
                        <Title
                            level={5}
                            style={{
                                margin: 0,
                            }}
                        >
                            {teacher.fullName}
                        </Title>
                    </Card>
                ))}
            </Flex>
        </Flex>
    )
})
