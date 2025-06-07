import { useEffect } from "react";
import type { UpdateInventoryDTOType } from "../data";
import { useInventoryStore } from "../stores";
import { toast } from "sonner";

export const useEditInventory = () => {
    const { modal, updateInventory, inventories, resetUpdateInventoryState, resetModal } = useInventoryStore();

    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            modal.onClose();
            resetModal();
        }
    };

    const isLoading = updateInventory.state.state === "loading";

    const handleSubmitEdit = async (data: UpdateInventoryDTOType & { id: number }) => {
        if (modal.data) {
            try {
                await updateInventory.updateInventory(modal.data.id, data);
                await inventories.getAllInventories();
            } finally {
                modal.onClose();
                resetModal();
            }
        }
    };

    useEffect(() => {
        if (updateInventory.state.state === "success") {
            toast.success("Inventory item updated successfully");
        }
        if (updateInventory.state.state === "error") {
            toast.error(updateInventory.state.error || "Failed to update inventory item");
        }

        return () => {
            resetUpdateInventoryState();
        };
    }, [updateInventory.state.state, resetUpdateInventoryState]);

    return {
        data: modal.data,
        isOpen: modal.isOpen && modal.mode === "edit",
        onOpenChange,
        handleSubmitEdit,
        isLoading,
    };
};
