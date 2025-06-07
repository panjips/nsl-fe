import { useEffect } from "react";
import type { UpdateAddonDTOType } from "../data";
import { useAddonStore } from "../stores";
import { toast } from "sonner";

export const useEditAddon = () => {
    const { modal, updateAddon, addons, resetUpdateAddonState, resetModal } = useAddonStore();

    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            modal.onClose();
            resetModal();
        }
    };

    const isLoading = updateAddon.state.state === "loading";

    const handleSubmitEdit = async (data: UpdateAddonDTOType) => {
        if (modal.data) {
            try {
                await updateAddon.updateAddon(modal.data.id, data);
                await addons.getAllAddons();
            } finally {
                modal.onClose();
                resetModal();
            }
        }
    };

    useEffect(() => {
        if (updateAddon.state.state === "success") {
            toast.success("Add-on updated successfully");
        }
        if (updateAddon.state.state === "error") {
            toast.error(updateAddon.state.error || "Failed to update add-on");
        }

        return () => {
            resetUpdateAddonState();
        };
    }, [updateAddon.state.state, resetUpdateAddonState]);

    return {
        data: modal.data,
        isOpen: modal.isOpen && modal.mode === "edit",
        onOpenChange,
        handleSubmitEdit,
        isLoading,
    };
};
