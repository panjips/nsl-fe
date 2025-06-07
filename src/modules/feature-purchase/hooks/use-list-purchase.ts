import { useEffect, useMemo, useState } from "react";
import { usePurchaseStore } from "../stores";

export const useListPurchase = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { purchases, resetPurchasesState } = usePurchaseStore();

    useEffect(() => {
        purchases.getAllPurchases();

        return () => {
            resetPurchasesState();
        };
    }, []);

    const listPurchase = useMemo(() => {
        if (purchases.state.state === "success") {
            return purchases.state.data;
        }
    }, [purchases.state.state]);

    const filteredData = useMemo(() => {
        if (!searchTerm.trim() || !listPurchase) return listPurchase;

        return listPurchase.filter((item) => {
            const inventoryName = item.inventory?.name?.toLowerCase() || "";
            const quantity = String(item.quantity).toLowerCase();
            const purchaseDate = new Date(item.purchase_date).toLocaleDateString().toLowerCase();

            const searchTermLower = searchTerm.toLowerCase();

            return (
                inventoryName.includes(searchTermLower) ||
                quantity.includes(searchTermLower) ||
                purchaseDate.includes(searchTermLower)
            );
        });
    }, [listPurchase, searchTerm]);

    return {
        data: filteredData,
        setSearchTerm,
        searchTerm,
        state: purchases.state.state,
        isLoading: purchases.state.state === "loading",
        isError: purchases.state.state === "error",
        error: purchases.state.state === "error" ? purchases.state.error : null,
        reset: resetPurchasesState,
    };
};
