import { ListTransactionsHistoryPage, useHistoryStore } from "@/modules/feature-history";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout/history/transaction")({
    component: RouteComponent,
    beforeLoad: async () => {
        const store = useHistoryStore.getState();
        await store.transactions.getTransactions();
    },
});

function RouteComponent() {
    return (
        <div>
            <ListTransactionsHistoryPage />
        </div>
    );
}
