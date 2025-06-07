import { useEffect } from "react";
import type { BulkCreateAddonRecipeDTOType } from "../data";
import { useAddonRecipeStore } from "../stores";
import { toast } from "sonner";

export const useEditAddonRecipe = () => {
    const { modal, updateAddonRecipe, addonRecipes, addonRecipe, resetUpdateAddonRecipeState, resetModal } =
        useAddonRecipeStore();

    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            modal.onClose();
            resetModal();
        }
    };

    const isLoading = updateAddonRecipe.state.state === "loading";

    useEffect(() => {
        if (modal.addonId && modal.mode === "edit") {
            addonRecipe.getAddonRecipeByAddonId(modal.addonId);
        }
    }, [modal.addonId, modal.mode]);

    const handleSubmitEdit = async (data: BulkCreateAddonRecipeDTOType) => {
        if (modal.addonId) {
            try {
                await updateAddonRecipe.updateAddonRecipe(modal.addonId, data);
                await addonRecipes.getAllAddonRecipes();
            } finally {
                modal.onClose();
                resetModal();
            }
        }
    };

    useEffect(() => {
        if (updateAddonRecipe.state.state === "success") {
            toast.success("Addon recipe updated successfully");
        }
        if (updateAddonRecipe.state.state === "error") {
            toast.error(updateAddonRecipe.state.error || "Failed to update addon recipe");
        }

        return () => {
            resetUpdateAddonRecipeState();
        };
    }, [updateAddonRecipe.state.state, resetUpdateAddonRecipeState]);

    return {
        data: modal.data,
        addonId: modal.addonId,
        recipeData: addonRecipe.state.state === "success" ? addonRecipe.state.data : null,
        isRecipeLoading: addonRecipe.state.state === "loading",
        isOpen: modal.isOpen && modal.mode === "edit",
        onOpenChange,
        handleSubmitEdit,
        isLoading,
    };
};
