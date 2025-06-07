import { useEffect, useMemo } from "react";
import { useReservationStore } from "../stores";

export const useUserReservations = (userId: string | number) => {
    const { userReservations, resetUserReservationsState } = useReservationStore();

    useEffect(() => {
        if (userId) {
            userReservations.getReservationByUserId(userId);
        }

        return () => {
            resetUserReservationsState();
        };
    }, [userId]);

    const userReservationsList = useMemo(() => {
        if (userReservations.state.state === "success") {
            return userReservations.state.data;
        }
        return [];
    }, [userReservations.state.state]);

    return {
        data: userReservationsList,
        state: userReservations.state.state,
        isLoading: userReservations.state.state === "loading",
        isError: userReservations.state.state === "error",
        error: userReservations.state.state === "error" ? userReservations.state.error : null,
        reset: resetUserReservationsState,
    };
};
