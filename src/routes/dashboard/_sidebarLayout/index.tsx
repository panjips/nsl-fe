import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/modules/feature-dashboard/pages/dashboard-page";

export const Route = createFileRoute("/dashboard/_sidebarLayout/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <>
            <DashboardPage />
        </>
    );
}
