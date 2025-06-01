import { useEffect } from "react";
import { useProductRecipeStore } from "../stores";
import { toast } from "sonner";

export const useDeleteProductRecipe = () => {
  const {
    modal,
    deleteProductRecipe,
    productRecipes,
    resetDeleteProductRecipeState,
    resetModal,
  } = useProductRecipeStore();

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      modal.onClose();
    }
  };

  const isLoading = deleteProductRecipe.state.state === "loading";

  const handleSubmitDelete = async (productId: string | number) => {
    try {
      await deleteProductRecipe.deleteProductRecipesByProductId(productId);
      await productRecipes.getAllProductRecipes();
    } finally {
      modal.onClose();
      resetModal();
    }
  };

  useEffect(() => {
    if (deleteProductRecipe.state.state === "success") {
      toast.success(
        deleteProductRecipe.state.data?.message || "Product recipe deleted successfully"
      );
    }
    if (deleteProductRecipe.state.state === "error") {
      toast.error(deleteProductRecipe.state.error || "Failed to delete product recipe");
    }

    return () => {
      resetDeleteProductRecipeState();
    };
  }, [deleteProductRecipe.state.state, resetDeleteProductRecipeState]);

  return {
    isOpen: modal.isOpen && modal.mode === "delete",
    onOpenChange,
    handleSubmitDelete,
    productId: modal.productId,
    isLoading,
    data: modal.data,
  };
};
