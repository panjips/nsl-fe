import type { ViewState } from "@/stores/core";
import type { TableProduct } from "../domain";
import type { ApiResponse } from "@/lib/api";

export interface ProductState {
    products: {
        state: ViewState<TableProduct[], string>;
        getProducts: () => Promise<void>;
    };
    getProduct: {
        state: ViewState<ApiResponse<TableProduct>, string>;
        getProduct: (id: string | number) => Promise<void>;
    };
    createProduct: {
        state: ViewState<ApiResponse<any>, string>;
        createProduct: (data: FormData) => Promise<void>;
    };
    editProduct: {
        state: ViewState<ApiResponse<any>, string>;
        editProduct: (id: string | number, data: FormData) => Promise<void>;
    };
    deleteProduct: {
        state: ViewState<ApiResponse<any>, string>;
        deleteProduct: (id: string | number) => Promise<void>;
    };

    modal: {
        isOpen: boolean;
        mode: "delete" | null;
        id: string | number | null;
        onOpen: (mode: "delete", id: string | number) => void;
        onClose: () => void;
    };
    resetModal: () => void;

    resetProductsState: () => void;
    resetGetProductState: () => void;
    resetCreateProductsState: () => void;
    resetEditProductsState: () => void;
    resetDeleteProductsState: () => void;
}
