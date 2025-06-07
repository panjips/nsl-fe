import { ListReservationPage } from "@/modules/feature-reservation";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/reservation")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ListReservationPage />;
}
