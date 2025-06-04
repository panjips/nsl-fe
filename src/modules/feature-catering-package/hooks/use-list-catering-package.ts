import { useEffect, useMemo, useState } from "react";
import { useCateringPackageStore } from "../stores";

export const useListCateringPackage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { cateringPackages, resetCateringPackagesState } = useCateringPackageStore();

  useEffect(() => {
    cateringPackages.getAllCateringPackages();

    return () => {
      resetCateringPackagesState();
    };
  }, []);

  const listCateringPackage = useMemo(() => {
    if (cateringPackages.state.state === "success") {
      return cateringPackages.state.data;
    }
    return [];
  }, [cateringPackages.state.state]);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim() || !listCateringPackage) return listCateringPackage;

    return listCateringPackage.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [listCateringPackage, searchTerm]);

  return {
    data: filteredData,
    setSearchTerm,
    searchTerm,
    state: cateringPackages.state.state,
    isLoading: cateringPackages.state.state === "loading",
    isError: cateringPackages.state.state === "error",
    error: cateringPackages.state.state === "error" ? cateringPackages.state.error : null,
    reset: resetCateringPackagesState,
  };
};
