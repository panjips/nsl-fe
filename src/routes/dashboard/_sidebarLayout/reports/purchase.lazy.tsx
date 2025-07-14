import InventoryPurchaseReportPage from "@/modules/feature-reports/pages/inventory-purchase-report-page";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/_sidebarLayout/reports/purchase")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <InventoryPurchaseReportPage />
        </div>
    );
}
