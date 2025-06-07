import { create } from "zustand";
import type { CategoryState } from "./state";
import { errorState, initialState, loadingState, successState } from "@/stores/core";
import { categoryApi } from "../data";
import type { Category } from "../domain";

export const useCategoryStore = create<CategoryState>((set) => ({
    categories: {
        state: initialState(),
        getAllCategories: async () => {
            set((state) => ({
                categories: {
                    ...state.categories,
                    state: loadingState(),
                },
            }));
            try {
                const categories = await categoryApi.categories();
                if (!categories?.data) {
                    throw new Error("Categories response data is missing");
                }
                set((state) => ({
                    categories: {
                        ...state.categories,
                        state: successState(categories?.data || []),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    categories: {
                        ...state.categories,
                        state: errorState(error instanceof Error ? error.message : "Failed to fetch categories"),
                    },
                }));
            }
        },
    },
    updateCategory: {
        state: initialState(),
        updateCategory: async (id: string | number, data) => {
            set((state) => ({
                updateCategory: {
                    ...state.updateCategory,
                    state: loadingState(),
                },
            }));
            try {
                const category = await categoryApi.editCategory(id, data);
                if (!category?.data) {
                    throw new Error("Category response data is missing");
                }
                set((state) => ({
                    updateCategory: {
                        ...state.updateCategory,
                        state: successState(category?.data as Category),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    updateCategory: {
                        ...state.updateCategory,
                        state: errorState(error instanceof Error ? error.message : "Failed to update category"),
                    },
                }));
            }
        },
    },
    createCategory: {
        state: initialState(),
        createCategory: async (data) => {
            set((state) => ({
                createCategory: {
                    ...state.createCategory,
                    state: loadingState(),
                },
            }));
            try {
                const category = await categoryApi.createCategory(data);
                if (!category?.data) {
                    throw new Error("Category response data is missing");
                }
                set((state) => ({
                    createCategory: {
                        ...state.createCategory,
                        state: successState(category?.data as Category),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    createCategory: {
                        ...state.createCategory,
                        state: errorState(error instanceof Error ? error.message : "Failed to create category"),
                    },
                }));
            }
        },
    },
    deleteCategory: {
        state: initialState(),
        deleteCategory: async (id: string | number) => {
            set((state) => ({
                deleteCategory: {
                    ...state.deleteCategory,
                    state: loadingState(),
                },
            }));
            try {
                const category = await categoryApi.deleteCategory(id);
                if (!category) {
                    throw new Error("Delete category response is missing");
                }
                set((state) => ({
                    deleteCategory: {
                        ...state.deleteCategory,
                        state: successState(category),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    deleteCategory: {
                        ...state.deleteCategory,
                        state: errorState(error instanceof Error ? error.message : "Failed to delete category"),
                    },
                }));
            }
        },
    },
    modal: {
        isOpen: false,
        mode: null,
        data: null,
        id: null,
        onOpen: (mode, data, id) => {
            set((state) => ({
                modal: {
                    ...state.modal,
                    isOpen: true,
                    mode,
                    id: id ?? null,
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
                id: null,
            },
        }));
    },
    resetUpdateCategoryState: () => {
        set((state) => ({
            updateCategory: {
                ...state.updateCategory,
                state: initialState(),
            },
        }));
    },
    resetCategoriesState: () => {
        set((state) => ({
            categories: {
                ...state.categories,
                state: initialState(),
            },
        }));
    },
    resetCreateCategoryState: () => {
        set((state) => ({
            createCategory: {
                ...state.createCategory,
                state: initialState(),
            },
        }));
    },
    resetDeleteCategoryState: () => {
        set((state) => ({
            deleteCategory: {
                ...state.deleteCategory,
                state: initialState(),
            },
        }));
    },
}));
