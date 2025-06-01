import type { ViewState } from "@/stores/core";
import type { AddonRecipe} from "../domain/addon-recipe";
import type { BulkCreateAddonRecipeDTOType } from "../data";
import type { ApiResponse } from "@/lib/api";

export interface AddonRecipeState {
  addonRecipes: {
    state: ViewState<AddonRecipe[], string>;
    getAllAddonRecipes: () => Promise<void>;
  };
  
  addonRecipe: {
    state: ViewState<AddonRecipe, string>;
    getAddonRecipeByAddonId: (addonId: string | number) => Promise<void>;
  };
  
  createAddonRecipe: {
    state: ViewState<ApiResponse<null>, string>;
    createAddonRecipe: (data: BulkCreateAddonRecipeDTOType) => Promise<void>;
  };
  
  deleteAddonRecipe: {
    state: ViewState<ApiResponse<null>, string>;
    deleteAddonRecipesByAddonId: (addonId: string | number) => Promise<void>;
  };
  
  updateAddonRecipe: {
    state: ViewState<ApiResponse<null>, string>;
    updateAddonRecipe: (
      id: string | number,
      data: BulkCreateAddonRecipeDTOType
    ) => Promise<void>;
  };
  
  modal: {
    isOpen: boolean;
    mode: "create" | "edit" | "delete" | null;
    data?: AddonRecipe | null;
    addonId?: string | number | null;
    onOpen: (
      mode: "create" | "edit" | "delete",
      data?: AddonRecipe | null,
      addonId?: string | number
    ) => void;
    onClose: () => void;
  };
  
  resetModal: () => void;
  resetAddonRecipesState: () => void;
  resetAddonRecipeState: () => void;
  resetCreateAddonRecipeState: () => void;
  resetDeleteAddonRecipeState: () => void;
  resetUpdateAddonRecipeState: () => void;
}