import {createFileRoute, redirect} from '@tanstack/react-router'
import {isAuthResults} from "$entities/auth.ts";

export const Route = createFileRoute('/admin')({
    component: RouteComponent,
    beforeLoad: async () => {
        await isAuthResults()

        const data = isAuthResults.data()

        if (!data) {
            throw redirect({to: '/'})
        }

        if (data.role !== 'admin' || data.role !== 'teacher' || data.role !== 'student') {
            throw redirect({to: '/'})
        }
    },
})

function RouteComponent() {
    return <div>Hello "/admin"!</div>
}
