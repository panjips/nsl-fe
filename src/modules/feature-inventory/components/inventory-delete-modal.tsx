import { Modal } from "@/components/modal";
import { useDeleteInventory } from "../hooks";

export const InventoryDeleteModal = ({
    id,
}: {
    id: number | string | undefined;
}) => {
    const { isLoading, isOpen, handleSubmitDelete, onOpenChange } = useDeleteInventory();

    return (
        <Modal
            open={isOpen}
            onOpenChange={onOpenChange}
            title="Delete Inventory"
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
            <div className="space-y-4">
                <p>Are you sure you want to delete this inventory item?</p>
                <p>This action cannot be undone.</p>
            </div>
        </Modal>
    );
};
