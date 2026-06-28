import { Modal } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { isTestInfoOpenAtom } from '../../../teachers.state'

export const TestInfoModal = reatomComponent(({ ctx }) => {
    const isOpen = ctx.spy(isTestInfoOpenAtom)

    return (
        <Modal
            open={isOpen}
            footer={null}
            centered
            onCancel={() => isTestInfoOpenAtom(ctx, false)}
        />
    )
})
