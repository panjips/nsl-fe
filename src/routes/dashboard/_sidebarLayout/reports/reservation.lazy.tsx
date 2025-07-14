import { ReservationCateringReportPage } from "@/modules/feature-reports/pages/reservation-catering-report-page";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/_sidebarLayout/reports/reservation")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <ReservationCateringReportPage />
        </div>
    );
}
