import { useEffect, useMemo, useState } from "react";
import { useInventoryStore } from "../stores";

export const useListInventory = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { inventories, resetInventoriesState } = useInventoryStore();

    useEffect(() => {
        inventories.getAllInventories();

        return () => {
            resetInventoriesState();
        };
    }, []);

    const listInventory = useMemo(() => {
        if (inventories.state.state === "success") {
            return inventories.state.data;
        }
    }, [inventories.state.state]);

    const filteredData = useMemo(() => {
        if (!searchTerm.trim() || !listInventory) return listInventory;

        return listInventory.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.unit.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [listInventory, searchTerm]);

    return {
        data: filteredData,
        setSearchTerm,
        searchTerm,
        state: inventories.state.state,
        isLoading: inventories.state.state === "loading",
        isError: inventories.state.state === "error",
        error: inventories.state.state === "error" ? inventories.state.error : null,
        reset: resetInventoriesState,
    };
};
