import { useEffect } from "react";
import { useReservationStore } from "../stores";
import { toast } from "sonner";
import { ReservationStatus } from "../domain";

export const useDeleteReservation = () => {
    const { modal, deleteReservation, reservations, resetDeleteReservationState, resetModal } = useReservationStore();

    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            modal.onClose();
        }
    };

    const isLoading = deleteReservation.state.state === "loading";

    const handleSubmitDelete = async (id: string | number) => {
        try {
            await deleteReservation.deleteReservation(id);
            await reservations.getAllReservations(`${ReservationStatus.PENDING},${ReservationStatus.CONFIRMED},${ReservationStatus.WAITING_DEPOSIT},${ReservationStatus.DEPOSIT_PAID},${ReservationStatus.PAYMENT_PENDING}`,);
        } finally {
            modal.onClose();
            resetModal();
        }
    };

    useEffect(() => {
        if (deleteReservation.state.state === "success") {
            toast.success(deleteReservation.state.data?.message || "Reservation deleted successfully");
        }
        if (deleteReservation.state.state === "error") {
            toast.error(deleteReservation.state.error || "Failed to delete reservation");
        }

        return () => {
            resetDeleteReservationState();
        };
    }, [deleteReservation.state.state, resetDeleteReservationState]);

    return {
        isOpen: modal.isOpen && modal.mode === "delete",
        onOpenChange,
        handleSubmitDelete,
        isLoading,
    };
};
