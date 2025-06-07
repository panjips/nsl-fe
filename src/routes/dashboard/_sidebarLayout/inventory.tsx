import { ListInventoryPage } from "@/modules/feature-inventory";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/inventory")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <ListInventoryPage />
        </div>
    );
}
