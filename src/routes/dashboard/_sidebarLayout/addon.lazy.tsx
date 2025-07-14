import { ListAddonPage } from "@/modules/feature-addon";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/_sidebarLayout/addon")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <ListAddonPage />
        </div>
    );
}
