import { ListCategoryPage } from "@/modules/feature-category";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/category")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ListCategoryPage />
    </div>
  );
}
