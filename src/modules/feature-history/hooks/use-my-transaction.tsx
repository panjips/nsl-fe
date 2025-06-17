import { useMemo, useState } from "react";
import { useHistoryStore } from "../stores";

export const useMyTransaction = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<{
        payment: string;
        order: string;
    }>({
        payment: "ALL",
        order: "ALL",
    });
    const { myTransactions, resetMyTransactionsState } = useHistoryStore();

    const listMyTransactions = useMemo(() => {
        if (myTransactions.state.state === "success") {
            return myTransactions.state.data;
        }
    }, [myTransactions.state]);

    const filteredData = useMemo(() => {
        if (!listMyTransactions) return [];

        let filtered = [...listMyTransactions];

        if (statusFilter) {
            if (statusFilter.payment !== "ALL") {
                filtered = filtered.filter((item) => item.payment?.trx_status === statusFilter.payment);
            }

            if (statusFilter.order !== "ALL") {
                filtered = filtered.filter((item) => item.order_status === statusFilter.order);
            }
        }

        if (searchTerm.trim()) {
            filtered = filtered.filter(
                (item) =>
                    String(item.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (item.payment?.trx_status?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
                    item.order_status.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        }

        return filtered;
    }, [listMyTransactions, searchTerm, statusFilter]);

    return {
        data: filteredData,
        setStatusFilter,
        statusFilter,
        setSearchTerm,
        searchTerm,
        state: myTransactions.state.state,
        isLoading: myTransactions.state.state === "loading",
        isError: myTransactions.state.state === "error",
        error: myTransactions.state.state === "error" ? myTransactions.state.error : null,
        reset: resetMyTransactionsState,
    };
};
