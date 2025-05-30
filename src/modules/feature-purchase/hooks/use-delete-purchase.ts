import { useEffect } from "react";
import { usePurchaseStore } from "../stores";
import { toast } from "sonner";

export const useDeletePurchase = () => {
  const {
    modal,
    deletePurchase,
    purchases,
    resetDeletePurchaseState,
    resetModal,
  } = usePurchaseStore();

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      modal.onClose();
    }
  };

  const isLoading = deletePurchase.state.state === "loading";

  const handleSubmitDelete = async (id: string | number) => {
    try {
      await deletePurchase.deletePurchase(id);
      await purchases.getAllPurchases();
    } finally {
      modal.onClose();
      resetModal();
    }
  };

  useEffect(() => {
    if (deletePurchase.state.state === "success") {
      toast.success(
        deletePurchase.state.data?.message || "Purchase deleted successfully"
      );
    }
    if (deletePurchase.state.state === "error") {
      toast.error(deletePurchase.state.error || "Failed to delete purchase");
    }

    return () => {
      resetDeletePurchaseState();
    };
  }, [deletePurchase.state.state, resetDeletePurchaseState]);

  return {
    isOpen: modal.isOpen && modal.mode === "delete",
    onOpenChange,
    handleSubmitDelete,
    isLoading,
  };
};