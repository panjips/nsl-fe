import type { ViewState } from "@/stores/core";
import type { PurchaseWithInventory } from "../domain/purhcase";
import type { CreatePurchaseDTOType, UpdatePurchaseDTOType } from "../data";
import type { ApiResponse } from "@/lib/api";

export interface PurchaseState {
  purchases: {
    state: ViewState<PurchaseWithInventory[], string>;
    getAllPurchases: () => Promise<void>;
  };
  purchase: {
    state: ViewState<PurchaseWithInventory, string>;
    getPurchase: (id: string | number) => Promise<void>;
  };
  updatePurchase: {
    state: ViewState<ApiResponse<null>, string>;
    updatePurchase: (
      id: string | number,
      data: UpdatePurchaseDTOType
    ) => Promise<void>;
  };
  createPurchase: {
    state: ViewState<ApiResponse<null>, string>;
    createPurchase: (data: CreatePurchaseDTOType) => Promise<void>;
  };
  deletePurchase: {
    state: ViewState<ApiResponse<null>, string>;
    deletePurchase: (id: string | number) => Promise<void>;
  };
  modal: {
    isOpen: boolean;
    mode: "create" | "edit" | "delete" | null;
    data?: PurchaseWithInventory | null;
    id?: string | number | null;
    onOpen: (
      mode: "create" | "edit" | "delete",
      data?: PurchaseWithInventory | null,
      id?: string | number
    ) => void;
    onClose: () => void;
  };
  resetModal: () => void;
  resetPurchasesState: () => void;
  resetPurchaseState: () => void;
  resetUpdatePurchaseState: () => void;
  resetCreatePurchaseState: () => void;
  resetDeletePurchaseState: () => void;
}