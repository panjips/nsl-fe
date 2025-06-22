import InventoryUsageReportPage from "@/modules/feature-reports/pages/inventory-usage-report-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/reports/inventory")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <InventoryUsageReportPage />
        </div>
    );
}
