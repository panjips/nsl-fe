import { ListCateringPackagePage } from "@/modules/feature-catering-package";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/catering-package")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <ListCateringPackagePage />
        </div>
    );
}
