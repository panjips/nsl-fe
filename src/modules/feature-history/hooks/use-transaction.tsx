import { useMemo, useState } from "react";
import { useHistoryStore } from "../stores";

export const useTransaction = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<{
        payment: string;
        order: string;
    }>({
        payment: "ALL",
        order: "ALL",
    });
    const { transactions, resetTransactionsState } = useHistoryStore();

    const listTransactions = useMemo(() => {
        if (transactions.state.state === "success") {
            return transactions.state.data;
        }
    }, [transactions.state]);

    const filteredData = useMemo(() => {
        if (!listTransactions) return [];

        let filtered = [...listTransactions];

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
                    item.order_status.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.order_type.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        }

        return filtered;
    }, [listTransactions, searchTerm, statusFilter]);

    return {
        data: filteredData,
        setStatusFilter,
        statusFilter,
        setSearchTerm,
        searchTerm,
        state: transactions.state.state,
        isLoading: transactions.state.state === "loading",
        isError: transactions.state.state === "error",
        error: transactions.state.state === "error" ? transactions.state.error : null,
        reset: resetTransactionsState,
    };
};
