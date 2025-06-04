import { useEffect } from "react";
import { useCateringPackageStore } from "../stores";
import { toast } from "sonner";

export const useDeleteCateringPackage = () => {
  const {
    modal,
    deleteCateringPackage,
    cateringPackages,
    resetDeleteCateringPackageState,
    resetModal,
  } = useCateringPackageStore();

  const handleSubmitDelete = async (id: string | number) => {
    try {
      await deleteCateringPackage.deleteCateringPackage(id);
      await cateringPackages.getAllCateringPackages();
    } finally {
      modal.onClose();
      resetModal();
    }
  };

  useEffect(() => {
    if (deleteCateringPackage.state.state === "success") {
      toast.success("Catering package deleted successfully");
    }
    if (deleteCateringPackage.state.state === "error") {
      toast.error(deleteCateringPackage.state.error || "Failed to delete catering package");
    }

    return () => {
      resetDeleteCateringPackageState();
    };
  }, [deleteCateringPackage.state.state]);

  const isLoading = deleteCateringPackage.state.state === "loading";

  return {
    isOpen: modal.isOpen && modal.mode === "delete",
    onOpenChange: (isOpen: boolean) => {
      if (!isOpen) {
        modal.onClose();
        resetModal();
      }
    },
    handleSubmitDelete,
    id: modal.id,
    isLoading,
  };
};
