import type { ViewState } from "@/stores/core";
import type { CateringPackage } from "../domain/catering-package";
import type { CreateCateringPackageDTOType, UpdateCateringPackageDTOType } from "../data";
import type { ApiResponse } from "@/lib/api";

export interface CateringPackageState {
    cateringPackages: {
        state: ViewState<CateringPackage[], string>;
        getAllCateringPackages: () => Promise<void>;
    };
    cateringPackage: {
        state: ViewState<CateringPackage, string>;
        getCateringPackage: (id: string | number) => Promise<void>;
    };
    updateCateringPackage: {
        state: ViewState<ApiResponse<null>, string>;
        updateCateringPackage: (id: string | number, data: UpdateCateringPackageDTOType) => Promise<void>;
    };
    createCateringPackage: {
        state: ViewState<ApiResponse<null>, string>;
        createCateringPackage: (data: CreateCateringPackageDTOType) => Promise<void>;
    };
    deleteCateringPackage: {
        state: ViewState<ApiResponse<null>, string>;
        deleteCateringPackage: (id: string | number) => Promise<void>;
    };
    modal: {
        isOpen: boolean;
        mode: "create" | "edit" | "delete" | null;
        data?: CateringPackage | null;
        id?: string | number | null;
        onOpen: (mode: "create" | "edit" | "delete", data?: CateringPackage | null, id?: string | number) => void;
        onClose: () => void;
    };
    resetModal: () => void;
    resetCateringPackagesState: () => void;
    resetCateringPackageState: () => void;
    resetUpdateCateringPackageState: () => void;
    resetCreateCateringPackageState: () => void;
    resetDeleteCateringPackageState: () => void;
}
