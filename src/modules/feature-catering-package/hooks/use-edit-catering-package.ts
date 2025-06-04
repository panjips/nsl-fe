import { useEffect } from "react";
import { useCateringPackageStore } from "../stores";
import { toast } from "sonner";
import type { UpdateCateringPackageDTOType } from "../data";

export const useEditCateringPackage = () => {
  const {
    modal,
    updateCateringPackage,
    cateringPackage,
    cateringPackages,
    resetUpdateCateringPackageState,
    resetCateringPackageState,
    resetModal,
  } = useCateringPackageStore();

  useEffect(() => {
    if (modal.id && modal.mode === "edit") {
      cateringPackage.getCateringPackage(modal.id);
    }
  }, [modal.id, modal.mode]);

  const handleSubmitEdit = async (data: UpdateCateringPackageDTOType) => {
    if (modal.id) {
      try {
        await updateCateringPackage.updateCateringPackage(modal.id, data);
        await cateringPackages.getAllCateringPackages();
      } finally {
        modal.onClose();
        resetModal();
      }
    }
  };

  useEffect(() => {
    if (updateCateringPackage.state.state === "success") {
      toast.success("Catering package updated successfully");
    }
    if (updateCateringPackage.state.state === "error") {
      toast.error(updateCateringPackage.state.error || "Failed to update catering package");
    }

    return () => {
      resetUpdateCateringPackageState();
    };
  }, [updateCateringPackage.state.state]);

  return {
    isOpen: modal.isOpen && modal.mode === "edit",
    data: modal.data || (cateringPackage.state.state === "success" ? cateringPackage.state.data : null),
    onOpenChange: (isOpen: boolean) => {
      if (!isOpen) {
        modal.onClose();
        resetModal();
        resetCateringPackageState();
      }
    },
    handleSubmitEdit,
    isLoading: updateCateringPackage.state.state === "loading" || cateringPackage.state.state === "loading",
  };
};
