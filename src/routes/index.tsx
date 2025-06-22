import { OnlineOrderPage } from "@/modules/feature-online-order";
import { useSharedStore } from "@/modules/feature-shared";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: App,
    beforeLoad: async () => {
        const store = useSharedStore.getState();
        await store.getStatusStore.getStatusStore();
    },
});

function App() {
    return <OnlineOrderPage />;
}
