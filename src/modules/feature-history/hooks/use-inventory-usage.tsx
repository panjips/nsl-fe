import { useMemo, useState } from "react";
import { useHistoryStore } from "../stores";

export const useInventoryUsage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { inventoryUsageHistory, resetInventoryUsageHistoryState } = useHistoryStore();

    const listInventoryUsage = useMemo(() => {
        if (inventoryUsageHistory.state.state === "success") {
            return inventoryUsageHistory.state.data;
        }
    }, [inventoryUsageHistory.state]);

    const filteredData = useMemo(() => {
        if (!listInventoryUsage) return [];

        let filtered = [...listInventoryUsage];

        if (searchTerm.trim()) {
            const search = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (item) =>
                    String(item.id || "")
                        .toLowerCase()
                        .includes(search) ||
                    String(item.order_id || "")
                        .toLowerCase()
                        .includes(search) ||
                    String(item.inventory_id || "")
                        .toLowerCase()
                        .includes(search) ||
                    String(item.quantity_used || "")
                        .toLowerCase()
                        .includes(search) ||
                    (item.inventory?.name || "").toLowerCase().includes(search) ||
                    (item.inventory?.unit || "").toLowerCase().includes(search) ||
                    (item.order?.order_type || "").toLowerCase().includes(search) ||
                    (item.order?.order_status || "").toLowerCase().includes(search) ||
                    (item.order?.total_amount || "").toLowerCase().includes(search),
            );
        }

        return filtered;
    }, [listInventoryUsage, searchTerm]);

    return {
        data: filteredData,
        setSearchTerm,
        searchTerm,
        state: inventoryUsageHistory.state.state,
        isLoading: inventoryUsageHistory.state.state === "loading",
        isError: inventoryUsageHistory.state.state === "error",
        error: inventoryUsageHistory.state.state === "error" ? inventoryUsageHistory.state.error : null,
        reset: resetInventoryUsageHistoryState,
    };
};
