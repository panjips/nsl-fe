import { useEffect } from "react";
import { useAddonRecipeStore } from "../stores";
import { toast } from "sonner";
import type { BulkCreateAddonRecipeDTOType } from "../data";

export const useCreateAddonRecipe = () => {
    const { modal, createAddonRecipe, addonRecipes, resetCreateAddonRecipeState, resetModal } = useAddonRecipeStore();

    const isLoading = createAddonRecipe.state.state === "loading";

    const handleSubmitCreate = async (data: BulkCreateAddonRecipeDTOType) => {
        try {
            await createAddonRecipe.createAddonRecipe(data);
            await addonRecipes.getAllAddonRecipes();
        } finally {
            modal.onClose();
            resetModal();
        }
    };

    useEffect(() => {
        if (createAddonRecipe.state.state === "success") {
            toast.success("Addon recipe created successfully");
        }
        if (createAddonRecipe.state.state === "error") {
            toast.error(createAddonRecipe.state.error || "Failed to create addon recipe");
        }

        return () => {
            resetCreateAddonRecipeState();
        };
    }, [createAddonRecipe.state.state, resetCreateAddonRecipeState]);

    return {
        data: modal.data,
        addonId: modal.addonId,
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
