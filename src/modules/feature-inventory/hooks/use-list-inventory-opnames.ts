import { useEffect, useMemo, useState } from "react";
import { useInventoryStore } from "../stores";

export const useListInventoryOpnames = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { inventoryOpnames, resetInventoryOpnamesState } = useInventoryStore();

    useEffect(() => {
        inventoryOpnames.getAllInventoryOpnames();

        return () => {
            resetInventoryOpnamesState();
        };
    }, []);

    const listInventoryOpnames = useMemo(() => {
        if (inventoryOpnames.state.state === "success") {
            return inventoryOpnames.state.data;
        }
    }, [inventoryOpnames.state.state]);

    const filteredData = useMemo(() => {
        if (!searchTerm.trim() || !listInventoryOpnames) return listInventoryOpnames;

        return listInventoryOpnames.filter(
            (item) =>
                item.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.inventory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.opname_date.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [listInventoryOpnames, searchTerm]);

    return {
        data: filteredData,
        setSearchTerm,
        searchTerm,
        state: inventoryOpnames.state.state,
        isLoading: inventoryOpnames.state.state === "loading",
        isError: inventoryOpnames.state.state === "error",
        error: inventoryOpnames.state.state === "error" ? inventoryOpnames.state.error : null,
        reset: resetInventoryOpnamesState,
    };
};
