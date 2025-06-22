import { ListCateringsPage, useHistoryStore } from "@/modules/feature-history";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/history/catering")({
    component: RouteComponent,
    beforeLoad: async () => {
        const store = useHistoryStore.getState();
        await store.reservations.getReservations();
    },
});

function RouteComponent() {
    return (
        <div>
            <ListCateringsPage />
        </div>
    );
}
