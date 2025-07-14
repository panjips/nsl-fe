import { CreateProductPage } from "@/modules/feature-product";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/_sidebarLayout/product/create")({
    component: RouteComponent,
});

function RouteComponent() {
    return <CreateProductPage />;
}
