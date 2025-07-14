import { ListProductPage } from "@/modules/feature-product";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/_sidebarLayout/product/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <>
            <ListProductPage />
        </>
    );
}
