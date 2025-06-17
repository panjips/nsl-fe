import { useEffect, useMemo, useState } from "react";
import { onlineOrderStore } from "../stores";

export const useProcessingOrder = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { onlineOrders, resetOnlineOrdersState } = onlineOrderStore();

    useEffect(() => {
        onlineOrders.getAllOnlineOrders();

        return () => {
            resetOnlineOrdersState();
        };
    }, []);

    const listOnlineOrder = useMemo(() => {
        if (onlineOrders.state.state === "success") {
            return onlineOrders.state.data;
        }
    }, [onlineOrders.state.state]);

    const filteredData = useMemo(() => {
        if (!searchTerm.trim() || !listOnlineOrder) return listOnlineOrder;

        return listOnlineOrder.filter(
            (item) =>
                item.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.order_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.total_amount.toString().toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [listOnlineOrder, searchTerm]);

    return {
        data: filteredData,
        setSearchTerm,
        searchTerm,
        state: onlineOrders.state.state,
        isLoading: onlineOrders.state.state === "loading",
        isError: onlineOrders.state.state === "error",
        error: onlineOrders.state.state === "error" ? onlineOrders.state.error : null,
        reset: resetOnlineOrdersState,
    };
};
