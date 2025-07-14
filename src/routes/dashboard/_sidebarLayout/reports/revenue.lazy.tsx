import { RevenueReportPage } from "@/modules/feature-reports/pages/revenue-report-page";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/_sidebarLayout/reports/revenue")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <RevenueReportPage />
        </div>
    );
}
