import { useEffect } from "react";
import { useCategoryStore } from "../stores";
import { toast } from "sonner";

export const useDeleteCategory = () => {
  const { modal, deleteCategory, categories, resetDeleteCategoryState } =
    useCategoryStore();

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      modal.onClose();
    }
  };

  const isLoading = deleteCategory.state.state === "loading";

  const handleSubmitDelete = async (id: string | number) => {
    try {
      await deleteCategory.deleteCategory(id);
      await categories.getAllCategories();
    } finally {
      modal.onClose();
    }
  };

  useEffect(() => {
    if (deleteCategory.state.state === "success") {
      toast.success(
        deleteCategory.state.data.message || "Category deleted successfully"
      );
    }
    if (deleteCategory.state.state === "error") {
      toast.error(deleteCategory.state.error || "Failed to create category");
    }

    return () => {
      resetDeleteCategoryState();
    };
  }, [deleteCategory.state.state, resetDeleteCategoryState]);

  return {
    isOpen: modal.isOpen && modal.mode === "delete",
    onOpenChange,
    handleSubmitDelete,
    isLoading,
  };
};
