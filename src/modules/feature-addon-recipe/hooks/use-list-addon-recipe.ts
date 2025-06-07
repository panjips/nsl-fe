import { useEffect, useMemo, useState } from "react";
import { useAddonRecipeStore } from "../stores";

export const useListAddonRecipe = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { addonRecipes, resetAddonRecipesState } = useAddonRecipeStore();

    useEffect(() => {
        addonRecipes.getAllAddonRecipes();

        return () => {
            resetAddonRecipesState();
        };
    }, []);

    const listAddonRecipe = useMemo(() => {
        if (addonRecipes.state.state === "success") {
            return addonRecipes.state.data;
        }
    }, [addonRecipes.state.state]);

    const filteredData = useMemo(() => {
        if (!searchTerm.trim() || !listAddonRecipe) return listAddonRecipe;

        return listAddonRecipe.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())),
        );
    }, [listAddonRecipe, searchTerm]);

    return {
        data: filteredData,
        setSearchTerm,
        searchTerm,
        state: addonRecipes.state.state,
        isLoading: addonRecipes.state.state === "loading",
        isError: addonRecipes.state.state === "error",
        error: addonRecipes.state.state === "error" ? addonRecipes.state.error : null,
        reset: resetAddonRecipesState,
    };
};
