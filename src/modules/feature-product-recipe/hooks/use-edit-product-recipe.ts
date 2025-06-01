import { useEffect } from "react";
import type { BulkCreateProductRecipeDTOType } from "../data";
import { useProductRecipeStore } from "../stores";
import { toast } from "sonner";

export const useEditProductRecipe = () => {
  const {
    modal,
    updateProductRecipe,
    productRecipes,
    productRecipe,
    resetUpdateProductRecipeState,
    resetModal,
  } = useProductRecipeStore();

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      modal.onClose();
      resetModal();
    }
  };

  const isLoading = updateProductRecipe.state.state === "loading";

  // Get recipes for a product when editing
  useEffect(() => {
    if (modal.productId && modal.mode === "edit") {
      productRecipe.getProductRecipeByProductId(modal.productId);
    }
  }, [modal.productId, modal.mode]);

  const handleSubmitEdit = async (data: BulkCreateProductRecipeDTOType) => {
    if (modal.productId) {
      try {
        await updateProductRecipe.updateProductRecipe(modal.productId, data);
        await productRecipes.getAllProductRecipes();
      } finally {
        modal.onClose();
        resetModal();
      }
    }
  };

  useEffect(() => {
    if (updateProductRecipe.state.state === "success") {
      toast.success("Product recipe updated successfully");
    }
    if (updateProductRecipe.state.state === "error") {
      toast.error(updateProductRecipe.state.error || "Failed to update product recipe");
    }

    return () => {
      resetUpdateProductRecipeState();
    };
  }, [updateProductRecipe.state.state, resetUpdateProductRecipeState]);

  return {
    isOpen: modal.isOpen && modal.mode === "edit",
    data: productRecipe.state.state === "success" ? productRecipe.state.data : null,
    isLoading: isLoading || productRecipe.state.state === "loading",
    onOpenChange,
    handleSubmitEdit,
  };
};
