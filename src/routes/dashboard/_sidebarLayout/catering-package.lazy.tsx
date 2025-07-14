import { ListCateringPackagePage } from "@/modules/feature-catering-package";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/_sidebarLayout/catering-package")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <ListCateringPackagePage />
        </div>
    );
}
