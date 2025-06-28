import { useEffect } from "react";
import { useReservationStore } from "../stores";
import { toast } from "sonner";
import { ReservationStatus } from "../domain";

export const useReservationStatus = () => {
    const { modal, updateReservationStatus, reservations, resetUpdateReservationStatusState, resetModal } =
        useReservationStore();

    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            modal.onClose();
        }
    };

    const isLoading = updateReservationStatus.state.state === "loading";

    const handleUpdateStatus = async (id: string | number, data: { status: string }) => {
        try {
            await updateReservationStatus.updateReservationStatus(id, data);
            await reservations.getAllReservations(
                `${ReservationStatus.PENDING},${ReservationStatus.CONFIRMED},${ReservationStatus.WAITING_DEPOSIT},${ReservationStatus.DEPOSIT_PAID},${ReservationStatus.PAYMENT_PENDING}`,
            );
        } catch (error) {
            console.error("Failed to update reservation status:", error);
        } finally {
            modal.onClose();
            resetModal();
        }
    };

    useEffect(() => {
        if (updateReservationStatus.state.state === "success") {
            toast.success("Reservation status updated successfully");
        }
        if (updateReservationStatus.state.state === "error") {
            toast.error(updateReservationStatus.state.error || "Failed to update reservation status");
        }

        return () => {
            resetUpdateReservationStatusState();
        };
    }, [updateReservationStatus.state.state, resetUpdateReservationStatusState]);

    return {
        handleUpdateStatus,
        isLoading,
        isOpen: modal.isOpen && modal.mode === "status",
        onOpenChange,
        isError: updateReservationStatus.state.state === "error",
        error: updateReservationStatus.state.state === "error" ? updateReservationStatus.state.error : null,
    };
};
