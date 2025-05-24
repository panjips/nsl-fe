import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_sidebarLayout/product')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/products"!</div>
}
