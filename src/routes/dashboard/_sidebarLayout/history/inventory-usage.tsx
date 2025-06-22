import { ListInventoryUsagePage, useHistoryStore } from "@/modules/feature-history";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/history/inventory-usage")({
    component: RouteComponent,
    beforeLoad: async () => {
        const store = useHistoryStore.getState();
        await store.inventoryUsageHistory.getInventoryUsageHistory();
    },
});

function RouteComponent() {
    return (
        <div>
            <ListInventoryUsagePage />
        </div>
    );
}
