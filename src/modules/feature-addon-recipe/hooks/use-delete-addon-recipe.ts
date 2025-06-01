import { useEffect } from "react";
import { useAddonRecipeStore } from "../stores";
import { toast } from "sonner";

export const useDeleteAddonRecipe = () => {
  const {
    modal,
    deleteAddonRecipe,
    addonRecipes,
    resetDeleteAddonRecipeState,
    resetModal,
  } = useAddonRecipeStore();

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      modal.onClose();
    }
  };

  const isLoading = deleteAddonRecipe.state.state === "loading";

  const handleSubmitDelete = async (addonId: string | number) => {
    try {
      await deleteAddonRecipe.deleteAddonRecipesByAddonId(addonId);
      await addonRecipes.getAllAddonRecipes();
    } finally {
      modal.onClose();
      resetModal();
    }
  };

  useEffect(() => {
    if (deleteAddonRecipe.state.state === "success") {
      toast.success(
        deleteAddonRecipe.state.data?.message || "Addon recipe deleted successfully"
      );
    }
    if (deleteAddonRecipe.state.state === "error") {
      toast.error(deleteAddonRecipe.state.error || "Failed to delete addon recipe");
    }

    return () => {
      resetDeleteAddonRecipeState();
    };
  }, [deleteAddonRecipe.state.state, resetDeleteAddonRecipeState]);

  return {
    isOpen: modal.isOpen && modal.mode === "delete",
    onOpenChange,
    handleSubmitDelete,
    addonId: modal.addonId,
    isLoading,
  };
};