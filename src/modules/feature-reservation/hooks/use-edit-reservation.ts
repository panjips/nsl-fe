import { useEffect } from "react";
import type { UpdateReservationDTOType } from "../data";
import { useReservationStore } from "../stores";
import { toast } from "sonner";
import { ReservationStatus } from "../domain";

export const useEditReservation = () => {
    const { modal, updateReservation, reservations, resetUpdateReservationState, resetModal } = useReservationStore();

    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            modal.onClose();
            resetModal();
        }
    };

    const isLoading = updateReservation.state.state === "loading";

    const handleSubmitEdit = async (data: UpdateReservationDTOType) => {
        if (modal.data) {
            try {
                await updateReservation.updateReservation(modal.data.id, data);
                await reservations.getAllReservations(`${ReservationStatus.PENDING},${ReservationStatus.CONFIRMED},${ReservationStatus.WAITING_DEPOSIT},${ReservationStatus.DEPOSIT_PAID},${ReservationStatus.PAYMENT_PENDING}`,);
            } finally {
                modal.onClose();
                resetModal();
            }
        }
    };

    useEffect(() => {
        if (updateReservation.state.state === "success") {
            toast.success("Reservation updated successfully");
        }
        if (updateReservation.state.state === "error") {
            toast.error(updateReservation.state.error || "Failed to update reservation");
        }

        return () => {
            resetUpdateReservationState();
        };
    }, [updateReservation.state.state, resetUpdateReservationState]);

    return {
        data: modal.data,
        isOpen: modal.isOpen && modal.mode === "edit",
        onOpenChange,
        handleSubmitEdit,
        isLoading,
    };
};
