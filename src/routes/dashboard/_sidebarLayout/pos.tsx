import { POSPage } from "@/modules/feature-pos";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/pos")({
    component: RouteComponent,
});

function RouteComponent() {
    return <POSPage />;
}
