import {createRoot} from 'react-dom/client'
import {createRouter, RouterProvider} from '@tanstack/react-router'
import {routeTree} from "./routeTree.gen.ts";
import './shared/reset.css'
import {App} from "./app.tsx";

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}


const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
})


const rootElement = document.getElementById('root')!

createRoot(rootElement).render(
    <App>
        <RouterProvider router={router}/>
    </App>,
)
