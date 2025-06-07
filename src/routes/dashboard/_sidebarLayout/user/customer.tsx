import { ListUserPage, useUserStore } from "@/modules/feature-user-management";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/user/customer")({
    component: RouteComponent,
    beforeLoad: async () => {
        const store = useUserStore.getState();
        await store.users.getUsers("customer");
        return "customer";
    },
});

function RouteComponent() {
    return <ListUserPage />;
}
