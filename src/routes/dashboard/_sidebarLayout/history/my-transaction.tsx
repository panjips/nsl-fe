import { ListMyTransactionsPage, useHistoryStore } from "@/modules/feature-history";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/history/my-transaction")({
    component: RouteComponent,
    beforeLoad: async () => {
        const store = useHistoryStore.getState();
        await store.myTransactions.getMyTransactions();
    },
});

function RouteComponent() {
    return (
        <div>
            <ListMyTransactionsPage />
        </div>
    );
}
