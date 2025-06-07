import { CreateUserPage } from "@/modules/feature-user-management";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/user/create")({
    component: RouteComponent,
});

function RouteComponent() {
    return <CreateUserPage />;
}
