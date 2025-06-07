import { CreateProductPage } from "@/modules/feature-product";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/product/create")({
    component: RouteComponent,
});

function RouteComponent() {
    return <CreateProductPage />;
}
