import { useEffect, useMemo, useState } from "react";
import { useCategoryStore } from "../stores/store";

export const useListCategory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { categories, resetCategoriesState } = useCategoryStore();

  useEffect(() => {
    categories.getAllCategories();

    return () => {
      resetCategoriesState();
    };
  }, []);

  const listCategory = useMemo(() => {
    if (categories.state.state === "success") {
      return categories.state.data;
    }
  }, [categories.state.state]);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim() || !listCategory) return listCategory;

    return listCategory.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [listCategory, searchTerm]);

  return {
    data: filteredData,
    setSearchTerm,
    searchTerm,
    state: categories.state.state,
    isLoading: categories.state.state === "loading",
    isError: categories.state.state === "error",
    error: categories.state.state === "error" ? categories.state.error : null,
    reset: resetCategoriesState,
  };
};
