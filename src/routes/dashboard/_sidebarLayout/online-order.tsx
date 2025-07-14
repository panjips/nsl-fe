import { ListOnlineOrderPage } from "@/modules/feature-online-order";
import { useNotificationStore } from "@/stores";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/dashboard/_sidebarLayout/online-order")({
    component: RouteComponent,
});

function RouteComponent() {
    const resetOnlineOrderCount = useNotificationStore((state) => state.resetOnlineOrderCount);

    useEffect(() => {
        resetOnlineOrderCount();
    }, [resetOnlineOrderCount]);

    return (
        <div>
            <ListOnlineOrderPage />
        </div>
    );
}
