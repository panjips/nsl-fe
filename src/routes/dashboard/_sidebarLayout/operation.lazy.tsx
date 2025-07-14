import { StoreOperationPage } from "@/modules/feature-shared";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/_sidebarLayout/operation")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <StoreOperationPage />
        </div>
    );
}
