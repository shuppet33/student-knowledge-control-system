import type { SelectProps } from 'antd'
import { Input, Select, Typography } from 'antd'

import type { ReactNode } from 'react'

import styles from './role-page-layout.module.css'

const { Text } = Typography
const { TextArea } = Input

type RolePageLayoutProps = {
    children: ReactNode
    sidebar: ReactNode
    stretch?: boolean
}

type SidebarSectionProps = {
    children: ReactNode
    title?: ReactNode
    grow?: boolean
}

type RelationSelectProps = {
    loading?: boolean
    onChange: (value: string[]) => void
    options: SelectProps['options']
    placeholder: string
    title: ReactNode
    value: string[]
}

type SubjectNameEditorProps = {
    onChange: (value: string) => void
    title: ReactNode
    value: string
}

export const RolePageLayout = ({
    children,
    sidebar,
    stretch = false,
}: RolePageLayoutProps) => {
    return (
        <div
            className={`${styles.layout} ${
                stretch ? styles.layoutStretch : ''
            }`}
        >
            <aside
                className={`${styles.sidebar} ${
                    stretch ? styles.sidebarStretch : ''
                }`}
            >
                {sidebar}
            </aside>

            <main
                className={`${styles.content} ${
                    stretch ? styles.contentStretch : ''
                }`}
            >
                {children}
            </main>
        </div>
    )
}

export const SidebarSection = ({
    children,
    title,
    grow = false,
}: SidebarSectionProps) => {
    return (
        <section
            className={`${styles.section} ${
                grow ? styles.sectionGrow : ''
            }`}
        >
            {title && <Text className={styles.sectionTitle}>{title}</Text>}
            {children}
        </section>
    )
}

export const RelationSelect = ({
    loading,
    onChange,
    options,
    placeholder,
    title,
    value,
}: RelationSelectProps) => {
    return (
        <SidebarSection title={title}>
            <Select
                suffixIcon={false}
                mode="multiple"
                className={styles.relationSelect}
                virtual
                styles={{
                    content: {
                        maxHeight: '116px',
                        overflowY: 'auto',
                        boxSizing: 'border-box',
                        width: '100%',
                    },
                }}
                showSearch={{ optionFilterProp: 'label' }}
                placeholder={placeholder}
                value={value}
                loading={loading}
                onChange={onChange}
                options={options}
            />
        </SidebarSection>
    )
}

export const SubjectNameEditor = ({
    onChange,
    title,
    value,
}: SubjectNameEditorProps) => {
    return (
        <SidebarSection title={title}>
            <TextArea
                className={styles.nameInput}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        </SidebarSection>
    )
}
