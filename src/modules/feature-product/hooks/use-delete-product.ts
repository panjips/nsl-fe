import { useEffect } from "react";
import { useProductStore } from "../stores";
import { toast } from "sonner";

export const useDeleteProduct = () => {
    const { deleteProduct, products, resetDeleteProductsState, modal, resetModal } = useProductStore();

    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            modal.onClose();
            resetModal();
        }
    };

    const handleDeleteProduct = async (id: string | number) => {
        try {
            await deleteProduct.deleteProduct(id);
            await products.getProducts();
        } catch (error) {
            console.error("Failed to delete product:", error);
        } finally {
            modal.onClose();
            resetModal();
        }
    };

    useEffect(() => {
        if (deleteProduct.state.state === "success") {
            toast.success(deleteProduct.state.data.message || "Product deleted successfully");
        }
        if (deleteProduct.state.state === "error") {
            toast.error(deleteProduct.state.error || "Failed to delete product");
        }
        return () => {
            resetDeleteProductsState();
        };
    }, [deleteProduct.state.state, resetDeleteProductsState]);

    return {
        isOpen: modal.isOpen && modal.mode === "delete",
        onOpenChange,
        handleDeleteProduct,
        isLoading: deleteProduct.state.state === "loading",
    };
};
