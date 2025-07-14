import InventoryUsageReportPage from "@/modules/feature-reports/pages/inventory-usage-report-page";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/_sidebarLayout/reports/inventory")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <InventoryUsageReportPage />
        </div>
    );
}
