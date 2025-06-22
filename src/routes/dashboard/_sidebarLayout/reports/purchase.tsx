import InventoryPurchaseReportPage from "@/modules/feature-reports/pages/inventory-purchase-report-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/reports/purchase")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <InventoryPurchaseReportPage />
        </div>
    );
}
