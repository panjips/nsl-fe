import { UpdateUserPage, useUserStore } from "@/modules/feature-user-management";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/user/update/$userId")({
    component: RouteComponent,
    beforeLoad: async ({ params }) => {
        const store = useUserStore.getState();
        await store.getUser.getUser(params.userId);
    },
});

function RouteComponent() {
    return <UpdateUserPage />;
}
