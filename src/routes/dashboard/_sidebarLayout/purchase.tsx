import { ListPurchasePage } from "@/modules/feature-purchase";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/purchase")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ListPurchasePage />;
}
