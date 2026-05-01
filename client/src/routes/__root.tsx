import {createRootRoute, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'
import {NotFoundPage} from "$pages/not-found/not-found.view.tsx";

export const Route = createRootRoute({
    component: () => (
        <>
            <Outlet/>
            <TanStackRouterDevtools/>
        </>
    ),
    notFoundComponent: NotFoundPage
})