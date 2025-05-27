import { useEffect } from "react";
import { useProductStore } from "../stores";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export const useDeleteProduct = () => {
  const { deleteProduct, products, resetDeleteProductsState } =
    useProductStore();
  const navigate = useNavigate();

  const handleDeleteProduct = async (id: string | number) => {
    if (id) {
      await deleteProduct.deleteProduct(id);
    }
  };

  const refetchProducts = async () => {
    await products.getProducts();
  };

  const isLoading = deleteProduct.state.state === "loading";

  useEffect(() => {
    if (deleteProduct.state.state === "success") {
      toast.success(
        deleteProduct.state.data.message || "Product delete successfully"
      );
      refetchProducts();
      navigate({ to: "/dashboard/product" });
    }
    if (deleteProduct.state.state === "error") {
      toast.error(deleteProduct.state.error || "Failed to delete product");
    }
    return () => {
      resetDeleteProductsState();
    };
  }, [deleteProduct.state.state, resetDeleteProductsState]);

  return {
    isLoading,
    handleDeleteProduct,
  };
};
