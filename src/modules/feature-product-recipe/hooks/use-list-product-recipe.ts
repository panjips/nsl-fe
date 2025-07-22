import { useEffect, useMemo, useState } from "react";
import { useProductRecipeStore } from "../stores";
import type { ProductRecipe } from "../domain/product-recipe";

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
        return [];
    }, [productRecipes.state.state]);

    // Group products by id and sugar_type to create unique entries
    const groupedData = useMemo(() => {
        if (!listProductRecipe) return [];

        const grouped: ProductRecipe[] = [];

        listProductRecipe.forEach((product) => {
            // Group recipes by sugar_type
            const recipesBySugarType: Record<string, any[]> = {};

            product.recipes.forEach((recipe) => {
                const sugarType = recipe.sugar_type || "NORMAL";
                if (!recipesBySugarType[sugarType]) {
                    recipesBySugarType[sugarType] = [];
                }
                recipesBySugarType[sugarType].push(recipe);
            });

            Object.entries(recipesBySugarType).forEach(([sugarType, recipes]) => {
                grouped.push({
                    ...product,
                    id: `${product.id}-${sugarType}`,
                    sugar_type: sugarType as any,
                    recipes: recipes,
                });
            });
        });

        return grouped;
    }, [listProductRecipe]);

    const filteredData = useMemo(() => {
        if (!searchTerm.trim() || !groupedData) return groupedData;

        return groupedData.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description?.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [groupedData, searchTerm]);

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
