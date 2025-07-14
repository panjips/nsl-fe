import ProductSalesReportPage from "@/modules/feature-reports/pages/product-sales-report-page";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/_sidebarLayout/reports/product-sales")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <ProductSalesReportPage />
        </div>
    );
}
