import { useEffect } from "react";
import { useInventoryStore } from "../stores";
import { toast } from "sonner";

export const useDeleteInventory = () => {
  const {
    modal,
    deleteInventory,
    inventories,
    resetDeleteInventoryState,
    resetModal,
  } = useInventoryStore();

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      modal.onClose();
    }
  };

  const isLoading = deleteInventory.state.state === "loading";

  const handleSubmitDelete = async (id: string | number) => {
    try {
      await deleteInventory.deleteInventory(id);
      await inventories.getAllInventories();
    } finally {
      modal.onClose();
      resetModal();
    }
  };

  useEffect(() => {
    if (deleteInventory.state.state === "success") {
      toast.success(
        deleteInventory.state.data?.message || "Inventory item deleted successfully"
      );
    }
    if (deleteInventory.state.state === "error") {
      toast.error(deleteInventory.state.error || "Failed to delete inventory item");
    }

    return () => {
      resetDeleteInventoryState();
    };
  }, [deleteInventory.state.state, resetDeleteInventoryState]);

  return {
    isOpen: modal.isOpen && modal.mode === "delete",
    onOpenChange,
    handleSubmitDelete,
    isLoading,
  };
};