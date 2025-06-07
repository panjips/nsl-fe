import { useEffect } from "react";
import { useAddonStore } from "../stores";
import { toast } from "sonner";

export const useDeleteAddon = () => {
    const { modal, deleteAddon, addons, resetDeleteAddonState, resetModal } = useAddonStore();

    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            modal.onClose();
        }
    };

    const isLoading = deleteAddon.state.state === "loading";

    const handleSubmitDelete = async (id: string | number) => {
        try {
            await deleteAddon.deleteAddon(id);
            await addons.getAllAddons();
        } finally {
            modal.onClose();
            resetModal();
        }
    };

    useEffect(() => {
        if (deleteAddon.state.state === "success") {
            toast.success(deleteAddon.state.data?.message || "Add-on deleted successfully");
        }
        if (deleteAddon.state.state === "error") {
            toast.error(deleteAddon.state.error || "Failed to delete add-on");
        }

        return () => {
            resetDeleteAddonState();
        };
    }, [deleteAddon.state.state, resetDeleteAddonState]);

    return {
        isOpen: modal.isOpen && modal.mode === "delete",
        onOpenChange,
        handleSubmitDelete,
        isLoading,
    };
};
