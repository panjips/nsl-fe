import { useEffect, useMemo, useState } from "react";
import { useProductStore } from "../stores";

export const useListProduct = () => {
  const { products, resetProductsState } = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    products.getProducts();

    return () => {
      resetProductsState();
    };
  }, []);

  const listProducts = useMemo(() => {
    if (products.state.state === "success") {
      return products.state.data;
    }
  }, [products.state.state]);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim() || !listProducts) return listProducts;

    return listProducts.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [listProducts, searchTerm]);

  return {
    data: filteredData,
    setSearchTerm,
    searchTerm,
    state: products.state.state,
    isLoading: products.state.state === "loading",
    isError: products.state.state === "error",
    reset: resetProductsState,
  };
};
