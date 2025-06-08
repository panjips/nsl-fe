import { ReservationCateringPage } from "@/modules/feature-reservation-catering";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/reservation-catering")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ReservationCateringPage />;
}
