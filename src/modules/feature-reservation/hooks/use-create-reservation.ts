import { useEffect } from "react";
import { useReservationStore } from "../stores";
import { toast } from "sonner";
import type { CreateReservationDTOType } from "../data";
import { ReservationStatus } from "../domain";

export const useCreateReservation = () => {
    const { modal, createReservation, reservations, resetCreateReservationState, resetModal } = useReservationStore();

    const isLoading = createReservation.state.state === "loading";

    const handleSubmitCreate = async (data: CreateReservationDTOType) => {
        try {
            await createReservation.createReservation(data);
            await reservations.getAllReservations(
                `${ReservationStatus.PENDING},${ReservationStatus.CONFIRMED},${ReservationStatus.WAITING_DEPOSIT},${ReservationStatus.DEPOSIT_PAID},${ReservationStatus.PAYMENT_PENDING}`,
            );
        } finally {
            modal.onClose();
            resetModal();
        }
    };

    useEffect(() => {
        if (createReservation.state.state === "success") {
            toast.success("Reservation created successfully");
        }
        if (createReservation.state.state === "error") {
            toast.error(createReservation.state.error || "Failed to create reservation");
        }

        return () => {
            resetCreateReservationState();
        };
    }, [createReservation.state.state, resetCreateReservationState]);

    return {
        data: modal.data,
        onOpenChange: (isOpen: boolean) => {
            if (!isOpen) {
                modal.onClose();
                resetModal();
            }
        },
        isOpen: modal.isOpen && modal.mode === "create",
        handleSubmitCreate,
        isLoading,
    };
};
