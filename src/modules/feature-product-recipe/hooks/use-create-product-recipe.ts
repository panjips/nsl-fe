import { useEffect } from "react";
import { useProductRecipeStore } from "../stores";
import { toast } from "sonner";
import type { BulkCreateProductRecipeDTOType } from "../data";

export const useCreateProductRecipe = () => {
  const {
    modal,
    createProductRecipe,
    productRecipes,
    resetCreateProductRecipeState,
    resetModal,
  } = useProductRecipeStore();

  const isLoading = createProductRecipe.state.state === "loading";

  const handleSubmitCreate = async (data: BulkCreateProductRecipeDTOType) => {
    try {
      await createProductRecipe.createProductRecipe(data);
      await productRecipes.getAllProductRecipes();
    } finally {
      modal.onClose();
      resetModal();
    }
  };

  useEffect(() => {
    if (createProductRecipe.state.state === "success") {
      toast.success("Product recipe created successfully");
    }
    if (createProductRecipe.state.state === "error") {
      toast.error(createProductRecipe.state.error || "Failed to create product recipe");
    }

    return () => {
      resetCreateProductRecipeState();
    };
  }, [createProductRecipe.state.state, resetCreateProductRecipeState]);

  return {
    data: modal.data,
    productId: modal.productId,
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
