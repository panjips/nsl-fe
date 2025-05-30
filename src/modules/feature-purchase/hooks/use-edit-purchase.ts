import { useEffect } from "react";
import type { UpdatePurchaseDTOType } from "../data";
import { usePurchaseStore } from "../stores";
import { toast } from "sonner";

export const useEditPurchase = () => {
  const {
    modal,
    updatePurchase,
    purchases,
    resetUpdatePurchaseState,
    resetModal,
  } = usePurchaseStore();

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      modal.onClose();
      resetModal();
    }
  };

  const isLoading = updatePurchase.state.state === "loading";

  const handleSubmitEdit = async (data: UpdatePurchaseDTOType) => {
    if (modal.data) {
      try {
        await updatePurchase.updatePurchase(modal.data.id, data);
        await purchases.getAllPurchases();
      } finally {
        modal.onClose();
        resetModal();
      }
    }
  };

  useEffect(() => {
    if (updatePurchase.state.state === "success") {
      toast.success("Purchase updated successfully");
    }
    if (updatePurchase.state.state === "error") {
      toast.error(updatePurchase.state.error || "Failed to update purchase");
    }

    return () => {
      resetUpdatePurchaseState();
    };
  }, [updatePurchase.state.state, resetUpdatePurchaseState]);

  return {
    data: modal.data,
    isOpen: modal.isOpen && modal.mode === "edit",
    onOpenChange,
    handleSubmitEdit,
    isLoading,
  };
};