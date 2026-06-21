export type EntityCardProps = {
    title: string
    onClick?: () => void
    onDelete?: () => void | Promise<unknown>
}
