import { useEffect } from "react";
import { useAddonRecipeStore } from "../stores";

export const useAddonRecipeByAddonId = (addonId?: string | number) => {
    const { addonRecipe, resetAddonRecipeState } = useAddonRecipeStore();

    useEffect(() => {
        if (addonId) {
            addonRecipe.getAddonRecipeByAddonId(addonId);
        }

        return () => {
            resetAddonRecipeState();
        };
    }, [addonId]);

    return {
        data: addonRecipe.state.state === "success" ? addonRecipe.state.data : null,
        isLoading: addonRecipe.state.state === "loading",
        isError: addonRecipe.state.state === "error",
        error: addonRecipe.state.state === "error" ? addonRecipe.state.error : null,
    };
};
