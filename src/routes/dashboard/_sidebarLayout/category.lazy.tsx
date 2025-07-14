import { ListCategoryPage } from "@/modules/feature-category";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/_sidebarLayout/category")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <ListCategoryPage />
        </div>
    );
}
