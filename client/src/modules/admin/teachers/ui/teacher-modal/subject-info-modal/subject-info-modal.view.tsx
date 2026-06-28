import { Modal } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { isSubjectInfoOpenAtom } from '../../../teachers.state'

export const SubjectInfoModal = reatomComponent(({ ctx }) => {
    const isOpen = ctx.spy(isSubjectInfoOpenAtom)

    return (
        <Modal
            open={isOpen}
            footer={null}
            centered
            onCancel={() => isSubjectInfoOpenAtom(ctx, false)}
        />
    )
})
