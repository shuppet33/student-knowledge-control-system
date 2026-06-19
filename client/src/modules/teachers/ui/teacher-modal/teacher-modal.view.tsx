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

import {
    closeTeacherModalAction,
    selectedSubjectAtom,
    selectedTeacherAtom,
} from '../../teachers.state'
import { AddSubjectPopover } from '../add-subject-popover'

import { TeacherSubjectList } from './subject-list/teacher-subject-list.view'
import { TeacherTests } from './teacher-tests'

import styles from './teacher-modal.module.css'

const { Sider, Content } = Layout
const { Title } = Typography

export const TeacherModal = reatomComponent(({ ctx }) => {
    const teacher = ctx.spy(selectedTeacherAtom)
    const selectedSubject = ctx.spy(selectedSubjectAtom)

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
                    <Flex vertical gap={16} className={styles.siderContent}>
                        <Title level={4} className={styles.teacherTitle}>
                            {teacher?.fullName}
                        </Title>

                        <AddSubjectPopover />

                        <Input
                            placeholder="поиск"
                            prefix={<SearchOutlined />}
                            size="large"
                        />

                        <TeacherSubjectList />
                    </Flex>
                </Sider>

                <Content>
                    <Flex vertical gap={12}>
                        {!selectedSubject.id ? (
                            <>
                                <Flex justify="end" align="center">
                                    <Button
                                        icon={<CloseOutlined />}
                                        onClick={() =>
                                            closeTeacherModalAction(ctx)
                                        }
                                    />
                                </Flex>
                                <Flex
                                    justify="center"
                                    align="center"
                                    className={styles.empty}
                                >
                                    <Empty description="выберите предмет" />
                                </Flex>
                            </>
                        ) : (
                            <>
                                <Flex justify="space-between" align="center">
                                    <Title
                                        level={5}
                                        className={styles.filtersTitle}
                                    >
                                        фильтры
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
                                        placeholder="поиск"
                                        prefix={<SearchOutlined />}
                                        size="large"
                                        className={styles.searchInput}
                                    />

                                    <Select
                                        mode="multiple"
                                        placeholder="группы"
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
