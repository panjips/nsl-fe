import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/reports/inventory")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/dashboard/_sidebarLayout/reports/inventory"!</div>;
}
