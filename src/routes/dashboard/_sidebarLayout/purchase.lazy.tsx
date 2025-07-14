import { ListPurchasePage } from "@/modules/feature-purchase";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/_sidebarLayout/purchase")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ListPurchasePage />;
}
