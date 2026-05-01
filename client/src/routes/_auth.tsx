import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import {isAuthResults} from "$entities/auth.ts";
import {wrap} from "@reatom/core";
import {Layout} from "$features/layout/main-layout.tsx";
import { Header } from '$features/layout/header';

const AuthLayout = () => {
    return (
        <Layout>
            <Header />
            <Outlet/>
        </Layout>
    )
}


export const Route = createFileRoute('/_auth')({
    component: AuthLayout,
    beforeLoad: async () => {
        await wrap(isAuthResults())

        const data = isAuthResults.data()

        if (!data) {
            throw redirect({ to: '/' })
        }
    }
})