import { useEffect } from "react";
import { useReservationStore } from "../stores";

export const useViewReservation = () => {
    const { modal, reservation, resetReservationState, resetModal } = useReservationStore();

    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            modal.onClose();
            resetModal();
        }
    };

    const isLoading = reservation.state.state === "loading";

    useEffect(() => {
        if (modal.isOpen && modal.mode === "view" && modal.id) {
            reservation.getReservation(modal.id);
        }

        return () => {
            resetReservationState();
        };
    }, [modal.isOpen, modal.mode, modal.id]);

    return {
        data: reservation.state.state === "success" ? reservation.state.data : null,
        isOpen: modal.isOpen && modal.mode === "view",
        onOpenChange,
        isLoading,
        isError: reservation.state.state === "error",
        error: reservation.state.state === "error" ? reservation.state.error : null,
    };
};
