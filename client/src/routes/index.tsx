import {createFileRoute, redirect} from '@tanstack/react-router'
import {MainPage} from "$pages/main/index.view.tsx";
import {isAuthResults} from "$entities/auth.ts";
import {wrap} from "@reatom/core";

export const Route = createFileRoute('/')({
    beforeLoad: async () => {
        await wrap(isAuthResults())

        const data = isAuthResults.data()

        if (data) {
            throw redirect({
                to: `/${data.role}` as 'admin' | 'student' | 'teacher'
            })
        }
    },
    component: MainPage,
})