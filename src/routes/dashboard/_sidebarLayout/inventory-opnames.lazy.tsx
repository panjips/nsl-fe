import { ListInventoryOpnamesPage } from "@/modules/feature-inventory";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/_sidebarLayout/inventory-opnames")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <ListInventoryOpnamesPage />
        </div>
    );
}
