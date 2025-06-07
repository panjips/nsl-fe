import { useCallback, useEffect, useMemo, useState } from "react";
import { useReservationStore } from "../stores";

export const useListReservation = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const { reservations, resetReservationsState } = useReservationStore();

    useEffect(() => {
        reservations.getAllReservations();

        return () => {
            resetReservationsState();
        };
    }, []);

    const clearStatusFilter = useCallback(() => {
        setStatusFilter(null);
    }, []);

    const listReservation = useMemo(() => {
        if (reservations.state.state === "success") {
            return reservations.state.data;
        }
    }, [reservations.state.state]);

    const filteredData = useMemo(() => {
        if (!listReservation) return [];

        let filtered = listReservation;

        if (statusFilter) {
            filtered = filtered.filter((item) => item.status === statusFilter);
        }

        if (searchTerm.trim()) {
            filtered = filtered.filter(
                (item) =>
                    item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.event_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.notes?.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        }

        return filtered;
    }, [listReservation, searchTerm, statusFilter]);

    return {
        data: filteredData,
        setSearchTerm,
        searchTerm,
        statusFilter,
        setStatusFilter,
        clearStatusFilter,
        state: reservations.state.state,
        isLoading: reservations.state.state === "loading",
        isError: reservations.state.state === "error",
        error: reservations.state.state === "error" ? reservations.state.error : null,
        reset: resetReservationsState,
    };
};
