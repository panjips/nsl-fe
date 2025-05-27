import { ListProductPage } from "@/modules/feature-product";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/product/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <ListProductPage />
    </>
  );
}
