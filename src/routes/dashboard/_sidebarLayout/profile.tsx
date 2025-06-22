import { useUserStore } from "@/modules/feature-user-management";
import { ProfilePage } from "@/modules/feature-user-management/pages/profile-page";
import { useGlobalAuthStore } from "@/stores";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/profile")({
    component: RouteComponent,
    beforeLoad: async () => {
        const globalAuth = useGlobalAuthStore.getState();

        const store = useUserStore.getState();
        await store.getUser.getUser(globalAuth.user?.id || "");
    },
});

function RouteComponent() {
    return (
        <div>
            <ProfilePage />
        </div>
    );
}
