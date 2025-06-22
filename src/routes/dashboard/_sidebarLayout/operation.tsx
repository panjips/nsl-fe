import { StoreOperationPage } from "@/modules/feature-shared";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/operation")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <StoreOperationPage />
        </div>
    );
}
