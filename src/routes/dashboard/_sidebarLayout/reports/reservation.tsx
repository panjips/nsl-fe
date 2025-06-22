import { ReservationCateringReportPage } from "@/modules/feature-reports/pages/reservation-catering-report-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/reports/reservation")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <ReservationCateringReportPage />
        </div>
    );
}
