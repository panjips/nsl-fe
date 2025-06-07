import { useEffect, useMemo, useState } from "react";
import { useAddonStore } from "../stores";

export const useListAddon = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { addons, resetAddonsState } = useAddonStore();

    useEffect(() => {
        addons.getAllAddons();

        return () => {
            resetAddonsState();
        };
    }, []);

    const listAddon = useMemo(() => {
        if (addons.state.state === "success") {
            return addons.state.data;
        }
    }, [addons.state.state]);

    const filteredData = useMemo(() => {
        if (!searchTerm.trim() || !listAddon) return listAddon;

        return listAddon.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())),
        );
    }, [listAddon, searchTerm]);

    return {
        data: filteredData,
        setSearchTerm,
        searchTerm,
        state: addons.state.state,
        isLoading: addons.state.state === "loading",
        isError: addons.state.state === "error",
        error: addons.state.state === "error" ? addons.state.error : null,
        reset: resetAddonsState,
    };
};
