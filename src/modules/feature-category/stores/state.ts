import type { ViewState } from "@/stores/core";
import type { Category } from "../domain/category";
import type { CreateCategoryDTOType, UpdateCategoryDTOType } from "../data";
import type { ApiResponse } from "@/lib/api";

export interface CategoryState {
    categories: {
        state: ViewState<Category[], string>;
        getAllCategories: () => Promise<void>;
    };
    updateCategory: {
        state: ViewState<Category, string>;
        updateCategory: (id: string | number, data: UpdateCategoryDTOType) => Promise<void>;
    };
    createCategory: {
        state: ViewState<Category, string>;
        createCategory: (data: CreateCategoryDTOType) => Promise<void>;
    };
    deleteCategory: {
        state: ViewState<ApiResponse<null>, string>;
        deleteCategory: (id: string | number) => Promise<void>;
    };
    modal: {
        isOpen: boolean;
        mode: "create" | "edit" | "delete" | null;
        data?: Category | null;
        id?: string | number | null;
        onOpen: (mode: "create" | "edit" | "delete", data?: Category | null, id?: string | number) => void;
        onClose: () => void;
    };
    resetModal: () => void;
    resetUpdateCategoryState: () => void;
    resetCategoriesState: () => void;
    resetCreateCategoryState: () => void;
    resetDeleteCategoryState: () => void;
}
