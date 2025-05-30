import { ListAddonPage } from "@/modules/feature-addon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/addon")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ListAddonPage />
    </div>
  );
}
