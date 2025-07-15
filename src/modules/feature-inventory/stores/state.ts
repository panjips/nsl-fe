import type { ViewState } from "@/stores/core";
import type { Inventory, InventoryOpname } from "../domain/inventory";
import type { CreateInventoryDTOType, CreateInventoryOpnameDTOType, UpdateInventoryDTOType } from "../data";
import type { ApiResponse } from "@/lib/api";

export interface InventoryState {
    inventories: {
        state: ViewState<Inventory[], string>;
        getAllInventories: () => Promise<void>;
    };
    inventoryOpnames: {
        state: ViewState<InventoryOpname[], string>;
        getAllInventoryOpnames: () => Promise<void>;
    };
    inventory: {
        state: ViewState<Inventory, string>;
        getInventory: (id: string | number) => Promise<void>;
    };
    updateInventory: {
        state: ViewState<ApiResponse<null>, string>;
        updateInventory: (id: string | number, data: UpdateInventoryDTOType) => Promise<void>;
    };
    createInventory: {
        state: ViewState<ApiResponse<null>, string>;
        createInventory: (data: CreateInventoryDTOType) => Promise<void>;
    };
    createInventoryOpname: {
        state: ViewState<ApiResponse<null>, string>;
        createInventoryOpname: (data: CreateInventoryOpnameDTOType) => Promise<void>;
    };
    deleteInventory: {
        state: ViewState<ApiResponse<null>, string>;
        deleteInventory: (id: string | number) => Promise<void>;
    };
    modal: {
        isOpen: boolean;
        mode: "create" | "edit" | "delete" | null;
        data?: Inventory | null;
        id?: string | number | null;
        onOpen: (mode: "create" | "edit" | "delete", data?: Inventory | null, id?: string | number) => void;
        onClose: () => void;
    };

    modalOpname: {
        isOpen: boolean;
        mode: "create" | null;
        data?: InventoryOpname | null;
        id?: string | number | null;
        onOpen: (mode: "create", data?: InventoryOpname | null, id?: string | number) => void;
        onClose: () => void;
    };

    resetModal: () => void;
    resetModalOpname: () => void;
    resetInventoriesState: () => void;
    resetInventoryOpnamesState: () => void;
    resetInventoryState: () => void;
    resetUpdateInventoryState: () => void;
    resetCreateInventoryState: () => void;
    resetCreateInventoryOpnameState: () => void;
    resetDeleteInventoryState: () => void;
}
