import { useEffect, useMemo, useState } from "react";
import { useProductRecipeStore } from "../stores";

export const useListProductRecipe = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { productRecipes, resetProductRecipesState } = useProductRecipeStore();

  useEffect(() => {
    productRecipes.getAllProductRecipes();

    return () => {
      resetProductRecipesState();
    };
  }, []);

  const listProductRecipe = useMemo(() => {
    if (productRecipes.state.state === "success") {
      return productRecipes.state.data;
    }
  }, [productRecipes.state.state]);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim() || !listProductRecipe) return listProductRecipe;

    return listProductRecipe.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [listProductRecipe, searchTerm]);

  return {
    data: filteredData,
    setSearchTerm,
    searchTerm,
    state: productRecipes.state.state,
    isLoading: productRecipes.state.state === "loading",
    isError: productRecipes.state.state === "error",
    error: productRecipes.state.state === "error" ? productRecipes.state.error : null,
    reset: resetProductRecipesState,
  };
};
