import { useCallback, useEffect, useMemo, useState } from "react";
import { useReservationStore } from "../stores";

export const useUserReservations = (userId: string | number) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const { userReservations, resetUserReservationsState } = useReservationStore();

    useEffect(() => {
        if (userId) {
            userReservations.getReservationByUserId(userId);
        }

        return () => {
            resetUserReservationsState();
        };
    }, [userId]);

    const clearStatusFilter = useCallback(() => {
        setStatusFilter(null);
    }, []);

    const userReservationsList = useMemo(() => {
        if (userReservations.state.state === "success") {
            return userReservations.state.data;
        }
        return [];
    }, [userReservations.state.state]);

    const filteredData = useMemo(() => {
        if (!userReservationsList) return [];

        let filtered = userReservationsList;

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
    }, [userReservationsList, searchTerm, statusFilter]);

    return {
        data: filteredData,
        setSearchTerm,
        searchTerm,
        statusFilter,
        setStatusFilter,
        clearStatusFilter,
        state: userReservations.state.state,
        isLoading: userReservations.state.state === "loading",
        isError: userReservations.state.state === "error",
        error: userReservations.state.state === "error" ? userReservations.state.error : null,
        reset: resetUserReservationsState,
    };
};
