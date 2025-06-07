import { Modal } from "@/components/modal";
import { useDeleteReservation } from "../hooks";

export const ReservationDeleteModal = ({
    id,
}: {
    id: number | string | undefined;
}) => {
    const { isLoading, isOpen, handleSubmitDelete, onOpenChange } = useDeleteReservation();
    return (
        <Modal
            open={isOpen}
            onOpenChange={onOpenChange}
            title="Delete Reservation"
            size="md"
            actionText={isLoading ? "Deleting..." : "Delete"}
            actionVariant="destructive"
            isFooter={true}
            onAction={() => {
                if (id) {
                    handleSubmitDelete(id);
                }
            }}
        >
            <p>Are you sure you want to delete this reservation?</p>
        </Modal>
    );
};
