import { UpdateProductPage, useProductStore } from "@/modules/feature-product";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/product/update/$productId")({
    component: RouteComponent,
    beforeLoad: async ({ params }) => {
        const store = useProductStore.getState();
        await store.getProduct.getProduct(params.productId);
    },
});

function RouteComponent() {
    return <UpdateProductPage />;
}
