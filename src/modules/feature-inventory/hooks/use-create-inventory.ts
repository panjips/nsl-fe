import { useEffect } from "react";
import { useInventoryStore } from "../stores";
import { toast } from "sonner";
import type { CreateInventoryDTOType } from "../data";

export const useCreateInventory = () => {
    const { modal, createInventory, inventories, resetCreateInventoryState, resetModal } = useInventoryStore();

    const isLoading = createInventory.state.state === "loading";

    const handleSubmitCreate = async (data: CreateInventoryDTOType) => {
        try {
            await createInventory.createInventory(data);
            await inventories.getAllInventories();
        } finally {
            modal.onClose();
            resetModal();
        }
    };

    useEffect(() => {
        if (createInventory.state.state === "success") {
            toast.success("Inventory item created successfully");
        }
        if (createInventory.state.state === "error") {
            toast.error(createInventory.state.error || "Failed to create inventory item");
        }

        return () => {
            resetCreateInventoryState();
        };
    }, [createInventory.state.state, resetCreateInventoryState]);

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
