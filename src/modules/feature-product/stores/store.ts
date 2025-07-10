import { create } from "zustand";
import type { ProductState } from "./state";
import { errorState, initialState, loadingState, successState } from "@/stores/core";
import { productApi } from "../data";
import type { TableProduct } from "../domain";

export const useProductStore = create<ProductState>((set) => ({
    products: {
        state: initialState(),
        getProducts: async () => {
            set((state) => ({
                products: {
                    ...state.products,
                    state: loadingState(),
                },
            }));
            try {
                const products = await productApi.products();
                if (!products?.data) {
                    throw new Error("Products response data is missing");
                }
                set((state) => ({
                    products: {
                        ...state.products,
                        state: successState(products.data as TableProduct[]),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    products: {
                        ...state.products,
                        state: errorState(error instanceof Error ? error.message : "Failed to fetch products"),
                    },
                }));
            }
        },
    },
    getProduct: {
        state: initialState(),
        getProduct: async (id: string | number) => {
            set((state) => ({
                getProduct: {
                    ...state.getProduct,
                    state: loadingState(),
                },
            }));
            try {
                const product = await productApi.getProduct(id);
                if (!product?.data) {
                    throw new Error("Product response data is missing");
                }
                set((state) => ({
                    getProduct: {
                        ...state.getProduct,
                        state: successState(product),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    getProduct: {
                        ...state.getProduct,
                        state: errorState(error instanceof Error ? error.message : "Failed to fetch product"),
                    },
                }));
            }
        },
    },
    createProduct: {
        state: initialState(),
        createProduct: async (data: FormData) => {
            set((state) => ({
                createProduct: {
                    ...state.createProduct,
                    state: loadingState(),
                },
            }));
            try {
                const product = await productApi.createProduct(data);
                if (!product) {
                    throw new Error("Products response data is missing");
                }
                set((state) => ({
                    createProduct: {
                        ...state.createProduct,
                        state: successState(product),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    createProduct: {
                        ...state.createProduct,
                        state: errorState(error instanceof Error ? error.message : "Failed to fetch products"),
                    },
                }));
            }
        },
    },
    editProduct: {
        state: initialState(),
        editProduct: async (id: string | number, data: FormData) => {
            set((state) => ({
                editProduct: {
                    ...state.editProduct,
                    state: loadingState(),
                },
            }));
            try {
                const product = await productApi.editProduct(id, data);
                if (!product) {
                    throw new Error("Products response data is missing");
                }
                set((state) => ({
                    editProduct: {
                        ...state.editProduct,
                        state: successState(product),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    editProduct: {
                        ...state.editProduct,
                        state: errorState(error instanceof Error ? error.message : "Failed to fetch products"),
                    },
                }));
            }
        },
    },
    deleteProduct: {
        state: initialState(),
        deleteProduct: async (id: string | number) => {
            set((state) => ({
                deleteProduct: {
                    ...state.deleteProduct,
                    state: loadingState(),
                },
            }));
            try {
                const product = await productApi.deleteProduct(id);
                if (!product) {
                    throw new Error("Products response data is missing");
                }
                set((state) => ({
                    deleteProduct: {
                        ...state.deleteProduct,
                        state: successState(product),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    deleteProduct: {
                        ...state.deleteProduct,
                        state: errorState(error instanceof Error ? error.message : "Failed to fetch products"),
                    },
                }));
            }
        },
    },
    modal: {
        isOpen: false,
        mode: null,
        id: null,
        onOpen: (mode, id) => {
            set((state) => ({
                modal: {
                    ...state.modal,
                    isOpen: true,
                    mode,
                    id,
                },
            }));
        },
        onClose: () => {
            set((state) => ({
                modal: {
                    ...state.modal,
                    isOpen: false,
                    mode: null,
                    id: null,
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
                id: null,
            },
        }));
    },
    resetProductsState: () => {
        set((state) => ({
            products: {
                ...state.products,
                state: initialState(),
            },
        }));
    },
    resetGetProductState: () => {
        set((state) => ({
            getProduct: {
                ...state.getProduct,
                state: initialState(),
            },
        }));
    },
    resetCreateProductsState: () => {
        set((state) => ({
            createProduct: {
                ...state.createProduct,
                state: initialState(),
            },
        }));
    },
    resetEditProductsState: () => {
        set((state) => ({
            editProduct: {
                ...state.editProduct,
                state: initialState(),
            },
        }));
    },
    resetDeleteProductsState: () => {
        set((state) => ({
            deleteProduct: {
                ...state.deleteProduct,
                state: initialState(),
            },
        }));
    },
}));
