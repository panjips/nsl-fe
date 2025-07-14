import { CreateUserPage } from "@/modules/feature-user-management";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/_sidebarLayout/user/create")({
    component: RouteComponent,
});

function RouteComponent() {
    return <CreateUserPage />;
}
