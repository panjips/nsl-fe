import { create } from "zustand";
import type { ProductRecipeState } from "./state";
import {
  errorState,
  initialState,
  loadingState,
  successState,
} from "@/stores/core";
import { productRecipeApi, type BulkCreateProductRecipeDTOType } from "../data";
import type { ProductRecipe } from "../domain";

export const useProductRecipeStore = create<ProductRecipeState>((set) => ({
  productRecipes: {
    state: initialState(),
    getAllProductRecipes: async () => {
      set((state) => ({
        productRecipes: {
          ...state.productRecipes,
          state: loadingState(),
        },
      }));
      try {
        const productRecipes = await productRecipeApi.getProductRecipes();
        if (!productRecipes?.data) {
          throw new Error("Addon recipes response data is missing");
        }
        set((state) => ({
          productRecipes: {
            ...state.productRecipes,
            state: successState(productRecipes?.data || []),
          },
        }));
      } catch (error) {
        set((state) => ({
          productRecipes: {
            ...state.productRecipes,
            state: errorState(
              error instanceof Error
                ? error.message
                : "Failed to fetch product recipes"
            ),
          },
        }));
      }
    },
  },
  
  productRecipe: {
    state: initialState(),
    getProductRecipeByProductId: async (productId: string | number) => {
      set((state) => ({
        productRecipe: {
          ...state.productRecipe,
          state: loadingState(),
        },
      }));
      try {
        const productRecipe = await productRecipeApi.getProductRecipeByProductId(productId);
        if (!productRecipe?.data) {
          throw new Error("Addon recipe response data is missing");
        }
        set((state) => ({
          productRecipe: {
            ...state.productRecipe,
            state: successState(productRecipe?.data as ProductRecipe),
          },
        }));
      } catch (error) {
        set((state) => ({
          productRecipe: {
            ...state.productRecipe,
            state: errorState(
              error instanceof Error
                ? error.message
                : "Failed to fetch product recipe"
            ),
          },
        }));
      }
    },
  },
  
  createProductRecipe: {
    state: initialState(),
    createProductRecipe: async (data: BulkCreateProductRecipeDTOType) => {
      set((state) => ({
        createProductRecipe: {
          ...state.createProductRecipe,
          state: loadingState(),
        },
      }));
      try {
        const response = await productRecipeApi.createProductRecipe(data);
        if (!response) {
          throw new Error("Create product recipe response is missing");
        }
        set((state) => ({
          createProductRecipe: {
            ...state.createProductRecipe,
            state: successState(response),
          },
        }));
      } catch (error) {
        set((state) => ({
          createProductRecipe: {
            ...state.createProductRecipe,
            state: errorState(
              error instanceof Error
                ? error.message
                : "Failed to create product recipe"
            ),
          },
        }));
      }
    },
  },
  
  deleteProductRecipe: {
    state: initialState(),
    deleteProductRecipesByProductId: async (productId: string | number) => {
      set((state) => ({
        deleteProductRecipe: {
          ...state.deleteProductRecipe,
          state: loadingState(),
        },
      }));
      try {
        const response = await productRecipeApi.deleteProductRecipesByProductId(productId);
        if (!response) {
          throw new Error("Delete product recipe response is missing");
        }
        set((state) => ({
          deleteProductRecipe: {
            ...state.deleteProductRecipe,
            state: successState(response),
          },
        }));
      } catch (error) {
        set((state) => ({
          deleteProductRecipe: {
            ...state.deleteProductRecipe,
            state: errorState(
              error instanceof Error
                ? error.message
                : "Failed to delete product recipe"
            ),
          },
        }));
      }
    },
  },
  
  updateProductRecipe: {
    state: initialState(),
    updateProductRecipe: async (id: string | number, data) => {
      set((state) => ({
        updateProductRecipe: {
          ...state.updateProductRecipe,
          state: loadingState(),
        },
      }));
      try {
        const response = await productRecipeApi.updateProductRecipe(id, data);
        if (!response?.data) {
          throw new Error("Update product recipe response data is missing");
        }
        set((state) => ({
          updateProductRecipe: {
            ...state.updateProductRecipe,
            state: successState(response),
          },
        }));
      } catch (error) {
        set((state) => ({
          updateProductRecipe: {
            ...state.updateProductRecipe,
            state: errorState(
              error instanceof Error
                ? error.message
                : "Failed to update product recipe"
            ),
          },
        }));
      }
    },
  },
  
  modal: {
    isOpen: false,
    mode: null,
    data: null,
    productId: null,
    onOpen: (mode, data, productId) => {
      set((state) => ({
        modal: {
          ...state.modal,
          isOpen: true,
          mode,
          productId: productId ?? null,
          data: data ?? null,
        },
      }));
    },
    onClose: () => {
      set((state) => ({
        modal: {
          ...state.modal,
          isOpen: false,
          mode: null,
          data: null,
        },
      }));
    },
  },
  
  resetModal: () => {
    set((state) => ({
      modal: {
        ...state.modal,
        isOpen: false,
        mode: null,
        data: null,
        productId: null,
      },
    }));
  },
  
  resetProductRecipesState: () => {
    set((state) => ({
      productRecipes: {
        ...state.productRecipes,
        state: initialState(),
      },
    }));
  },
  
  resetProductRecipeState: () => {
    set((state) => ({
      productRecipe: {
        ...state.productRecipe,
        state: initialState(),
      },
    }));
  },
  
  resetCreateProductRecipeState: () => {
    set((state) => ({
      createProductRecipe: {
        ...state.createProductRecipe,
        state: initialState(),
      },
    }));
  },
  
  resetDeleteProductRecipeState: () => {
    set((state) => ({
      deleteProductRecipe: {
        ...state.deleteProductRecipe,
        state: initialState(),
      },
    }));
  },
  
  resetUpdateProductRecipeState: () => {
    set((state) => ({
      updateProductRecipe: {
        ...state.updateProductRecipe,
        state: initialState(),
      },
    }));
  },
}));