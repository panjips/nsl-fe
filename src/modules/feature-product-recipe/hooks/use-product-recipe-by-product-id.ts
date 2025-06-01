import { useEffect } from "react";
import { useProductRecipeStore } from "../stores";

export const useProductRecipeByProductId = (productId?: string | number) => {
  const { productRecipe, resetProductRecipeState } = useProductRecipeStore();

  useEffect(() => {
    if (productId) {
      productRecipe.getProductRecipeByProductId(productId);
    }

    return () => {
      resetProductRecipeState();
    };
  }, [productId]);

  return {
    data: productRecipe.state.state === "success" ? productRecipe.state.data : null,
    isLoading: productRecipe.state.state === "loading",
    isError: productRecipe.state.state === "error",
    error: productRecipe.state.state === "error" ? productRecipe.state.error : null,
  };
};
