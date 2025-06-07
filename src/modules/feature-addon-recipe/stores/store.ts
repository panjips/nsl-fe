import { create } from "zustand";
import type { AddonRecipeState } from "./state";
import { errorState, initialState, loadingState, successState } from "@/stores/core";
import { addonRecipeApi, type BulkCreateAddonRecipeDTOType } from "../data";
import type { AddonRecipe } from "../domain/addon-recipe";

export const useAddonRecipeStore = create<AddonRecipeState>((set) => ({
    addonRecipes: {
        state: initialState(),
        getAllAddonRecipes: async () => {
            set((state) => ({
                addonRecipes: {
                    ...state.addonRecipes,
                    state: loadingState(),
                },
            }));
            try {
                const addonRecipes = await addonRecipeApi.getAddonRecipes();
                if (!addonRecipes?.data) {
                    throw new Error("Addon recipes response data is missing");
                }
                set((state) => ({
                    addonRecipes: {
                        ...state.addonRecipes,
                        state: successState(addonRecipes?.data || []),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    addonRecipes: {
                        ...state.addonRecipes,
                        state: errorState(error instanceof Error ? error.message : "Failed to fetch addon recipes"),
                    },
                }));
            }
        },
    },

    addonRecipe: {
        state: initialState(),
        getAddonRecipeByAddonId: async (addonId: string | number) => {
            set((state) => ({
                addonRecipe: {
                    ...state.addonRecipe,
                    state: loadingState(),
                },
            }));
            try {
                const addonRecipe = await addonRecipeApi.getAddonRecipeByAddonId(addonId);
                if (!addonRecipe?.data) {
                    throw new Error("Addon recipe response data is missing");
                }
                set((state) => ({
                    addonRecipe: {
                        ...state.addonRecipe,
                        state: successState(addonRecipe?.data as AddonRecipe),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    addonRecipe: {
                        ...state.addonRecipe,
                        state: errorState(error instanceof Error ? error.message : "Failed to fetch addon recipe"),
                    },
                }));
            }
        },
    },

    createAddonRecipe: {
        state: initialState(),
        createAddonRecipe: async (data: BulkCreateAddonRecipeDTOType) => {
            set((state) => ({
                createAddonRecipe: {
                    ...state.createAddonRecipe,
                    state: loadingState(),
                },
            }));
            try {
                const response = await addonRecipeApi.createAddonRecipe(data);
                if (!response) {
                    throw new Error("Create addon recipe response is missing");
                }
                set((state) => ({
                    createAddonRecipe: {
                        ...state.createAddonRecipe,
                        state: successState(response),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    createAddonRecipe: {
                        ...state.createAddonRecipe,
                        state: errorState(error instanceof Error ? error.message : "Failed to create addon recipe"),
                    },
                }));
            }
        },
    },

    deleteAddonRecipe: {
        state: initialState(),
        deleteAddonRecipesByAddonId: async (addonId: string | number) => {
            set((state) => ({
                deleteAddonRecipe: {
                    ...state.deleteAddonRecipe,
                    state: loadingState(),
                },
            }));
            try {
                const response = await addonRecipeApi.deleteAddonRecipesByAddonId(addonId);
                if (!response) {
                    throw new Error("Delete addon recipe response is missing");
                }
                set((state) => ({
                    deleteAddonRecipe: {
                        ...state.deleteAddonRecipe,
                        state: successState(response),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    deleteAddonRecipe: {
                        ...state.deleteAddonRecipe,
                        state: errorState(error instanceof Error ? error.message : "Failed to delete addon recipe"),
                    },
                }));
            }
        },
    },

    updateAddonRecipe: {
        state: initialState(),
        updateAddonRecipe: async (id: string | number, data) => {
            set((state) => ({
                updateAddonRecipe: {
                    ...state.updateAddonRecipe,
                    state: loadingState(),
                },
            }));
            try {
                const response = await addonRecipeApi.updateAddonRecipe(id, data);

                set((state) => ({
                    updateAddonRecipe: {
                        ...state.updateAddonRecipe,
                        state: successState(response),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    updateAddonRecipe: {
                        ...state.updateAddonRecipe,
                        state: errorState(error instanceof Error ? error.message : "Failed to update addon recipe"),
                    },
                }));
            }
        },
    },

    modal: {
        isOpen: false,
        mode: null,
        data: null,
        addonId: null,
        onOpen: (mode, data, addonId) => {
            set((state) => ({
                modal: {
                    ...state.modal,
                    isOpen: true,
                    mode,
                    addonId: addonId ?? null,
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
                addonId: null,
            },
        }));
    },

    resetAddonRecipesState: () => {
        set((state) => ({
            addonRecipes: {
                ...state.addonRecipes,
                state: initialState(),
            },
        }));
    },

    resetAddonRecipeState: () => {
        set((state) => ({
            addonRecipe: {
                ...state.addonRecipe,
                state: initialState(),
            },
        }));
    },

    resetCreateAddonRecipeState: () => {
        set((state) => ({
            createAddonRecipe: {
                ...state.createAddonRecipe,
                state: initialState(),
            },
        }));
    },

    resetDeleteAddonRecipeState: () => {
        set((state) => ({
            deleteAddonRecipe: {
                ...state.deleteAddonRecipe,
                state: initialState(),
            },
        }));
    },

    resetUpdateAddonRecipeState: () => {
        set((state) => ({
            updateAddonRecipe: {
                ...state.updateAddonRecipe,
                state: initialState(),
            },
        }));
    },
}));
