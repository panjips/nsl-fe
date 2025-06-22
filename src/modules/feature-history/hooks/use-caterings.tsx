import { useMemo, useState } from "react";
import { useHistoryStore } from "../stores";

export const useCaterings = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const { reservations, resetReservationsState } = useHistoryStore();

    const listCaterings = useMemo(() => {
        if (reservations.state.state === "success") {
            return reservations.state.data;
        }

        return [];
    }, [reservations.state]);

    const filteredData = useMemo(() => {
        if (!listCaterings) return [];

        let filtered = [...listCaterings];

        if (statusFilter) {
            filtered = filtered.filter((item) => item.status === statusFilter);
        }

        if (searchTerm.trim()) {
            const search = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (item) =>
                    String(item.id || "")
                        .toLowerCase()
                        .includes(search) ||
                    (item.location || "").toLowerCase().includes(search) ||
                    (item.status || "").toLowerCase().includes(search) ||
                    (item.event_date ? new Date(item.event_date).toLocaleDateString() : "")
                        .toLowerCase()
                        .includes(search) ||
                    (item.user?.name || "").toLowerCase().includes(search) ||
                    (item.user?.email || "").toLowerCase().includes(search) ||
                    (item.user?.phone_number || "").toLowerCase().includes(search) ||
                    String(item.total_price || "").includes(search) ||
                    (item.notes || "").toLowerCase().includes(search) ||
                    item.orderCaterings?.some(
                        (order) =>
                            (order.cateringPackage?.name || "").toLowerCase().includes(search) ||
                            (order.cateringPackage?.description || "").toLowerCase().includes(search) ||
                            String(order.price || "").includes(search) ||
                            String(order.quantity_cup || "").includes(search),
                    ) ||
                    false,
            );
        }

        return filtered;
    }, [listCaterings, searchTerm, statusFilter]);

    return {
        data: filteredData,
        setSearchTerm,
        setStatusFilter,
        statusFilter,
        searchTerm,
        state: reservations.state.state,
        isLoading: reservations.state.state === "loading",
        isError: reservations.state.state === "error",
        error: reservations.state.state === "error" ? reservations.state.error : null,
        reset: resetReservationsState,
    };
};
