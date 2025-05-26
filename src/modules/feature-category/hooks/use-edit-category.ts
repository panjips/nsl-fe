import { useEffect } from "react";
import type { UpdateCategoryDTOType } from "../data";
import { useCategoryStore } from "../stores";
import { toast } from "sonner";

export const useEditCategory = () => {
  const {
    modal,
    updateCategory,
    categories,
    resetUpdateCategoryState,
    resetModal,
  } = useCategoryStore();

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      modal.onClose();
      resetModal();
    }
  };

  const isLoading = updateCategory.state.state === "loading";

  const handleSubmitEdit = async (data: UpdateCategoryDTOType) => {
    if (modal.data) {
      try {
        await updateCategory.updateCategory(modal.data.id, data);
        await categories.getAllCategories();
      } finally {
        modal.onClose();
        resetModal();
      }
    }
  };

  useEffect(() => {
    if (updateCategory.state.state === "success") {
      toast.success("Category updated successfully");
    }
    if (updateCategory.state.state === "error") {
      toast.error(updateCategory.state.error || "Failed to update category");
    }

    return () => {
      resetUpdateCategoryState();
    };
  }, [updateCategory.state.state, resetUpdateCategoryState]);

  return {
    data: modal.data,
    isOpen: modal.isOpen && modal.mode === "edit",
    onOpenChange,
    handleSubmitEdit,
    isLoading,
  };
};
