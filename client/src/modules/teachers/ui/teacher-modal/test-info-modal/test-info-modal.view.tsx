import { Modal } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import {
    closeTestInfoAction,
    isTestInfoOpenAtom,
} from '../../../teachers.state'

export const TestInfoModal = reatomComponent(({ ctx }) => {
    const isOpen = ctx.spy(isTestInfoOpenAtom)

    return (
        <Modal
            open={isOpen}
            footer={null}
            centered
            onCancel={() => closeTestInfoAction(ctx)}
        />
    )
})
