import {
    Button,
    Empty,
    Flex,
    Input,
    Layout,
    Modal,
    Select,
    Space,
    Typography,
} from 'antd'
import {
    CloseOutlined,
    InfoCircleOutlined,
    SearchOutlined,
} from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import { closeTeacherModalAction } from '../model/teachers.actions.ts'
import {
    selectedSubjectIdAtom,
    selectedTeacherAtom,
} from '../model/teachers.atoms.ts'

import { AddSubjectPopover } from './add-subject-popover.tsx'
import { TeacherSubjectList } from './teacher-subject-list'
import { TeacherTests } from './teacher-tests'

const { Sider, Content } = Layout
const { Title } = Typography

export const TeacherModal = reatomComponent(({ ctx }) => {
    const teacher = ctx.spy(selectedTeacherAtom)
    const selectedSubjectId = ctx.spy(selectedSubjectIdAtom)

    return (
        <Modal
            open={!!teacher}
            footer={null}
            width={1200}
            centered
            closeIcon={false}
        >
            <Layout
                style={{
                    background: 'transparent',
                    minHeight: 700,
                }}
            >
                <Sider
                    width={260}
                    style={{
                        background: 'transparent',
                        paddingRight: 16,
                    }}
                >
                    <Flex vertical gap={16}>
                        <Title
                            level={4}
                            style={{
                                margin: 0,
                            }}
                        >
                            {teacher?.fullName}
                        </Title>

                        <AddSubjectPopover />

                        <Input
                            placeholder="Поиск"
                            prefix={<SearchOutlined />}
                            size="large"
                        />

                        <TeacherSubjectList />
                    </Flex>
                </Sider>

                <Content>
                    <Flex vertical gap={12}>
                        <Flex justify="space-between" align="center">
                            <Title
                                level={5}
                                style={{
                                    margin: 0,
                                }}
                            >
                                Фильтры
                            </Title>

                            <Space>
                                <Button icon={<InfoCircleOutlined />} />

                                <Button
                                    icon={<CloseOutlined />}
                                    onClick={() => closeTeacherModalAction(ctx)}
                                />
                            </Space>
                        </Flex>

                        {!selectedSubjectId ? (
                            <Flex
                                justify="center"
                                align="center"
                                style={{
                                    height: 500,
                                }}
                            >
                                <Empty description="Выберите предмет" />
                            </Flex>
                        ) : (
                            <>
                                <Space size={16}>
                                    <Input
                                        placeholder="Поиск"
                                        prefix={<SearchOutlined />}
                                        size="large"
                                        style={{
                                            width: 220,
                                        }}
                                    />

                                    <Select
                                        mode="multiple"
                                        placeholder="Группы"
                                        size="large"
                                        style={{
                                            width: 220,
                                        }}
                                    />
                                </Space>

                                <TeacherTests />
                            </>
                        )}
                    </Flex>
                </Content>
            </Layout>
        </Modal>
    )
})
