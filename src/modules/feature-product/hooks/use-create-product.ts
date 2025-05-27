import { useEffect } from "react";
import { useProductStore } from "../stores";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export const useCreateProduct = () => {
  const { createProduct, resetCreateProductsState } = useProductStore();
  const navigate = useNavigate();

  const handleCreateProduct = async (data: FormData): Promise<void> => {
    if (data) {
      await createProduct.createProduct(data);
    }
  };

  useEffect(() => {
    if (createProduct.state.state === "success") {
      toast.error(
        createProduct.state.data.message || "Create product successfully"
      );
      navigate({ to: "/dashboard/product" });
    }

    if (createProduct.state.state === "error") {
      toast.error(createProduct.state.error || "Failed to create category");
    }

    return () => {
      resetCreateProductsState();
    };
  }, [createProduct.state.state, resetCreateProductsState]);

  const isLoading = createProduct.state.state === "loading";

  return {
    handleCreateProduct,
    isLoading,
  };
};
