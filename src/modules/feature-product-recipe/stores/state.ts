import type { ViewState } from "@/stores/core";
import type { ProductRecipe } from "../domain";
import type { BulkCreateProductRecipeDTOType } from "../data";
import type { ApiResponse } from "@/lib/api";

export interface ProductRecipeState {
    productRecipes: {
        state: ViewState<ProductRecipe[], string>;
        getAllProductRecipes: () => Promise<void>;
    };

    productRecipe: {
        state: ViewState<ProductRecipe, string>;
        getProductRecipeByProductId: (productId: string | number) => Promise<void>;
    };

    createProductRecipe: {
        state: ViewState<ApiResponse<null>, string>;
        createProductRecipe: (data: BulkCreateProductRecipeDTOType) => Promise<void>;
    };

    deleteProductRecipe: {
        state: ViewState<ApiResponse<null>, string>;
        deleteProductRecipesByProductId: (productId: string | number) => Promise<void>;
    };

    updateProductRecipe: {
        state: ViewState<ApiResponse<null>, string>;
        updateProductRecipe: (id: string | number, data: BulkCreateProductRecipeDTOType) => Promise<void>;
    };

    modal: {
        isOpen: boolean;
        mode: "create" | "edit" | "delete" | null;
        data?: ProductRecipe | null;
        productId?: string | number | null;
        onOpen: (mode: "create" | "edit" | "delete", data?: ProductRecipe | null, productId?: string | number) => void;
        onClose: () => void;
    };

    resetModal: () => void;
    resetProductRecipesState: () => void;
    resetProductRecipeState: () => void;
    resetCreateProductRecipeState: () => void;
    resetDeleteProductRecipeState: () => void;
    resetUpdateProductRecipeState: () => void;
}
