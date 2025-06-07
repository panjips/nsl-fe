import type { ViewState } from "@/stores/core";
import type { Addon } from "../domain/addon";
import type { CreateAddonDTOType, UpdateAddonDTOType } from "../data";
import type { ApiResponse } from "@/lib/api";

export interface AddonState {
    addons: {
        state: ViewState<Addon[], string>;
        getAllAddons: () => Promise<void>;
    };
    addon: {
        state: ViewState<Addon, string>;
        getAddon: (id: string | number) => Promise<void>;
    };
    updateAddon: {
        state: ViewState<ApiResponse<null>, string>;
        updateAddon: (id: string | number, data: UpdateAddonDTOType) => Promise<void>;
    };
    createAddon: {
        state: ViewState<ApiResponse<null>, string>;
        createAddon: (data: CreateAddonDTOType) => Promise<void>;
    };
    deleteAddon: {
        state: ViewState<ApiResponse<null>, string>;
        deleteAddon: (id: string | number) => Promise<void>;
    };
    modal: {
        isOpen: boolean;
        mode: "create" | "edit" | "delete" | null;
        data?: Addon | null;
        id?: string | number | null;
        onOpen: (mode: "create" | "edit" | "delete", data?: Addon | null, id?: string | number) => void;
        onClose: () => void;
    };
    resetModal: () => void;
    resetAddonsState: () => void;
    resetAddonState: () => void;
    resetUpdateAddonState: () => void;
    resetCreateAddonState: () => void;
    resetDeleteAddonState: () => void;
}
