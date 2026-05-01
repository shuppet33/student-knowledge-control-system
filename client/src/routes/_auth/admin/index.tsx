import {createFileRoute} from '@tanstack/react-router'
import {reatomComponent} from "@reatom/react";

const AdminPage = reatomComponent(() => {
    return (
        <>
            ffjjj
        </>
    )
})

export const Route = createFileRoute('/_auth/admin/')({
    component: AdminPage,
})

