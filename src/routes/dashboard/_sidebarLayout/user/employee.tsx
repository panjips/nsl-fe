import { ListUserPage, useUserStore } from "@/modules/feature-user-management";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/user/employee")({
    component: RouteComponent,
    beforeLoad: async () => {
        const store = useUserStore.getState();
        await store.users.getUsers("employee");
        return "employee";
    },
});

function RouteComponent() {
    return <ListUserPage />;
}
