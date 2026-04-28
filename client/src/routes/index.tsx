import {createFileRoute} from '@tanstack/react-router'
import {MainPage} from "$pages/main/index.view.tsx";

export const Route = createFileRoute('/')({
    component: MainPage,
})