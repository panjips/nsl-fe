import { MyReservationPage } from "@/modules/feature-reservation-catering";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/_sidebarLayout/my-reservation")({
    component: RouteComponent,
});

function RouteComponent() {
    return <MyReservationPage />;
}
