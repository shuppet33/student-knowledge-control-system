import {createFileRoute, redirect} from '@tanstack/react-router'
import {isAuthResults} from "$entities/auth.ts";

export const Route = createFileRoute('/_auth')({
    component: RouteComponent,
    beforeLoad: async () => {
        await isAuthResults()

        const data = isAuthResults.data()

        if (data) {
            throw redirect({
                to: `/${data.role}` as '/admin' | '/student' | '/teacher'
            })
        }
    }
})

function RouteComponent() {
    return <div>Hello "/_auth"!</div>
}
