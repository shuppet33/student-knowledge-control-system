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

import { AddSubjectPopover } from '$features/admin/teachers/add-subject-popover/add-subject-popover.tsx'

import { closeTeacherModalAction } from '../teachers.actions.ts'
import {
    selectedSubjectIdAtom,
    selectedTeacherAtom,
} from '../teachers.atoms.ts'

import { TeacherTests } from './ teacher-tests'
import { TeacherSubjectList } from './teacher-subject-list.view.tsx'

import styles from './teacher-modal.module.css'

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
            onCancel={() => closeTeacherModalAction(ctx)}
        >
            <Layout className={styles.layout}>
                <Sider width={260} className={styles.sider}>
                    <Flex vertical gap={16}>
                        <Title level={4} className={styles.teacherTitle}>
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
                        {!selectedSubjectId ? (
                            <Flex
                                justify="center"
                                align="center"
                                className={styles.empty}
                            >
                                <Empty description="Выберите предмет" />
                            </Flex>
                        ) : (
                            <>
                                <Flex justify="space-between" align="center">
                                    <Title
                                        level={5}
                                        className={styles.filtersTitle}
                                    >
                                        Фильтры
                                    </Title>

                                    <Space>
                                        <Button icon={<InfoCircleOutlined />} />

                                        <Button
                                            icon={<CloseOutlined />}
                                            onClick={() =>
                                                closeTeacherModalAction(ctx)
                                            }
                                        />
                                    </Space>
                                </Flex>

                                <Space size={16}>
                                    <Input
                                        placeholder="Поиск"
                                        prefix={<SearchOutlined />}
                                        size="large"
                                        className={styles.searchInput}
                                    />

                                    <Select
                                        mode="multiple"
                                        placeholder="Группы"
                                        size="large"
                                        className={styles.groupsSelect}
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
