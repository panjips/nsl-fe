import { useEffect } from "react";
import { useInventoryStore } from "../stores";
import { toast } from "sonner";
import type { CreateInventoryOpnameDTOType } from "../data";

export const useCreateInventoryOpname = () => {
    const { modalOpname, createInventoryOpname, inventoryOpnames, resetCreateInventoryOpnameState, resetModal } =
        useInventoryStore();

    const isLoading = createInventoryOpname.state.state === "loading";

    const handleSubmitCreate = async (data: CreateInventoryOpnameDTOType) => {
        try {
            await createInventoryOpname.createInventoryOpname(data);
            await inventoryOpnames.getAllInventoryOpnames();
        } finally {
            modalOpname.onClose();
            resetModal();
        }
    };

    useEffect(() => {
        if (createInventoryOpname.state.state === "success") {
            toast.success("Inventory item created successfully");
        }
        if (createInventoryOpname.state.state === "error") {
            toast.error(createInventoryOpname.state.error || "Failed to create inventory item");
        }

        return () => {
            resetCreateInventoryOpnameState();
        };
    }, [createInventoryOpname.state.state, resetCreateInventoryOpnameState]);

    return {
        data: modalOpname.data,
        onOpenChange: (isOpen: boolean) => {
            if (!isOpen) {
                modalOpname.onClose();
                resetModal();
            }
        },
        isOpen: modalOpname.isOpen && modalOpname.mode === "create",
        handleSubmitCreate,
        isLoading,
    };
};
