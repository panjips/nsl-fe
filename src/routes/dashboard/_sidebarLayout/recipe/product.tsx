import { useProductStore } from "@/modules/feature-product";
import { ListProductRecipePage } from "@/modules/feature-product-recipe";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/recipe/product")({
    component: RouteComponent,
    beforeLoad: async () => {
        const store = useProductStore.getState();
        await store.products.getProducts();
    },
});

function RouteComponent() {
    return (
        <div>
            <ListProductRecipePage />
        </div>
    );
}
