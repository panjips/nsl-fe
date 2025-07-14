import { ListReservationPage } from "@/modules/feature-reservation";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/_sidebarLayout/reservation")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ListReservationPage />;
}
