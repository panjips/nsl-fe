import { ReservationCateringPage } from "@/modules/feature-reservation-catering";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/_sidebarLayout/reservation-catering")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ReservationCateringPage />;
}
