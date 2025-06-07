import { useEffect } from "react";
import { useAddonStore } from "../stores";
import { toast } from "sonner";
import type { CreateAddonDTOType } from "../data";

export const useCreateAddon = () => {
    const { modal, createAddon, addons, resetCreateAddonState, resetModal } = useAddonStore();

    const isLoading = createAddon.state.state === "loading";

    const handleSubmitCreate = async (data: CreateAddonDTOType) => {
        try {
            await createAddon.createAddon(data);
            await addons.getAllAddons();
        } finally {
            modal.onClose();
            resetModal();
        }
    };

    useEffect(() => {
        if (createAddon.state.state === "success") {
            toast.success("Add-on created successfully");
        }
        if (createAddon.state.state === "error") {
            toast.error(createAddon.state.error || "Failed to create add-on");
        }

        return () => {
            resetCreateAddonState();
        };
    }, [createAddon.state.state, resetCreateAddonState]);

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
