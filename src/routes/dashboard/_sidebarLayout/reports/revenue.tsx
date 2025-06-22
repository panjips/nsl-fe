import { RevenueReportPage } from "@/modules/feature-reports/pages/revenue-report-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/reports/revenue")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <RevenueReportPage />
        </div>
    );
}
