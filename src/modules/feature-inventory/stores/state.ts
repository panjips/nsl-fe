import type { ViewState } from "@/stores/core";
import type { Inventory } from "../domain/inventory";
import type { CreateInventoryDTOType, UpdateInventoryDTOType } from "../data";
import type { ApiResponse } from "@/lib/api";

export interface InventoryState {
  inventories: {
    state: ViewState<Inventory[], string>;
    getAllInventories: () => Promise<void>;
  };
  inventory: {
    state: ViewState<Inventory, string>;
    getInventory: (id: string | number) => Promise<void>;
  };
  updateInventory: {
    state: ViewState<ApiResponse<null>, string>;
    updateInventory: (
      id: string | number,
      data: UpdateInventoryDTOType
    ) => Promise<void>;
  };
  createInventory: {
    state: ViewState<ApiResponse<null>, string>;
    createInventory: (data: CreateInventoryDTOType) => Promise<void>;
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
    onOpen: (
      mode: "create" | "edit" | "delete",
      data?: Inventory | null,
      id?: string | number
    ) => void;
    onClose: () => void;
  };
  resetModal: () => void;
  resetInventoriesState: () => void;
  resetInventoryState: () => void;
  resetUpdateInventoryState: () => void;
  resetCreateInventoryState: () => void;
  resetDeleteInventoryState: () => void;
}