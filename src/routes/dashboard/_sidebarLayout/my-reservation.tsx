import { MyReservationPage } from "@/modules/feature-reservation-catering";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/my-reservation")({
    component: RouteComponent,
});

function RouteComponent() {
    return <MyReservationPage />;
}
