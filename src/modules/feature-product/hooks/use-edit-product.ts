import { useEffect } from "react";
import { useProductStore } from "../stores";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export const useEditProduct = () => {
    const { editProduct, resetEditProductsState } = useProductStore();
    const navigate = useNavigate();

    const handleUpdateProduct = async (id: string | number, data: FormData) => {
        if (id) {
            await editProduct.editProduct(id, data);
        }
    };

    const isLoading = editProduct.state.state === "loading";

    useEffect(() => {
        if (editProduct.state.state === "success") {
            toast.success(editProduct.state.data.message || "Product updated successfully");
            navigate({ to: "/dashboard/product" });
        }
        if (editProduct.state.state === "error") {
            toast.error(editProduct.state.error || "Failed to update product");
        }
        return () => {
            resetEditProductsState();
        };
    }, [editProduct.state.state, resetEditProductsState]);

    return {
        isLoading,
        handleUpdateProduct,
    };
};
