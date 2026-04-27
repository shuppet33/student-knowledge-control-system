import {createFileRoute, Link} from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/profile"! <Link to={'/'}>Home</Link></div>
}
