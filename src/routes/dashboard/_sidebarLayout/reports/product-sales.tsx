import ProductSalesReportPage from "@/modules/feature-reports/pages/product-sales-report-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/reports/product-sales")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <ProductSalesReportPage />
        </div>
    );
}
