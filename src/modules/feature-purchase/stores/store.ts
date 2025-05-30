import { create } from "zustand";
import type { PurchaseState } from "./state";
import {
  errorState,
  initialState,
  loadingState,
  successState,
} from "@/stores/core";
import { purchaseApi } from "../data";
import type { PurchaseWithInventory } from "../domain/purhcase";

export const usePurchaseStore = create<PurchaseState>((set) => ({
  purchases: {
    state: initialState(),
    getAllPurchases: async () => {
      set((state) => ({
        purchases: {
          ...state.purchases,
          state: loadingState(),
        },
      }));
      try {
        const purchases = await purchaseApi.getPurchases();
        if (!purchases?.data) {
          throw new Error("Purchases response data is missing");
        }
        set((state) => ({
          purchases: {
            ...state.purchases,
            state: successState(purchases?.data || []),
          },
        }));
      } catch (error) {
        set((state) => ({
          purchases: {
            ...state.purchases,
            state: errorState(
              error instanceof Error
                ? error.message
                : "Failed to fetch purchases"
            ),
          },
        }));
      }
    },
  },

  purchase: {
    state: initialState(),
    getPurchase: async (id: string | number) => {
      set((state) => ({
        purchase: {
          ...state.purchase,
          state: loadingState(),
        },
      }));
      try {
        const purchase = await purchaseApi.getPurchase(id);
        if (!purchase?.data) {
          throw new Error("Purchase response data is missing");
        }
        set((state) => ({
          purchase: {
            ...state.purchase,
            state: successState(purchase?.data as PurchaseWithInventory),
          },
        }));
      } catch (error) {
        set((state) => ({
          purchase: {
            ...state.purchase,
            state: errorState(
              error instanceof Error
                ? error.message
                : "Failed to fetch purchase"
            ),
          },
        }));
      }
    },
  },

  updatePurchase: {
    state: initialState(),
    updatePurchase: async (id: string | number, data) => {
      set((state) => ({
        updatePurchase: {
          ...state.updatePurchase,
          state: loadingState(),
        },
      }));
      try {
        const purchase = await purchaseApi.updatePurchase(id, data);
        if (!purchase?.data) {
          throw new Error("Purchase response data is missing");
        }
        set((state) => ({
          updatePurchase: {
            ...state.updatePurchase,
            state: successState(purchase),
          },
        }));
      } catch (error) {
        set((state) => ({
          updatePurchase: {
            ...state.updatePurchase,
            state: errorState(
              error instanceof Error
                ? error.message
                : "Failed to update purchase"
            ),
          },
        }));
      }
    },
  },

  createPurchase: {
    state: initialState(),
    createPurchase: async (data) => {
      set((state) => ({
        createPurchase: {
          ...state.createPurchase,
          state: loadingState(),
        },
      }));
      try {
        const purchase = await purchaseApi.createPurchase(data);
        if (!purchase?.data) {
          throw new Error("Purchase response data is missing");
        }
        set((state) => ({
          createPurchase: {
            ...state.createPurchase,
            state: successState(purchase),
          },
        }));
      } catch (error) {
        set((state) => ({
          createPurchase: {
            ...state.createPurchase,
            state: errorState(
              error instanceof Error
                ? error.message
                : "Failed to create purchase"
            ),
          },
        }));
      }
    },
  },

  deletePurchase: {
    state: initialState(),
    deletePurchase: async (id: string | number) => {
      set((state) => ({
        deletePurchase: {
          ...state.deletePurchase,
          state: loadingState(),
        },
      }));
      try {
        const purchase = await purchaseApi.deletePurchase(id);
        if (!purchase) {
          throw new Error("Delete purchase response is missing");
        }
        set((state) => ({
          deletePurchase: {
            ...state.deletePurchase,
            state: successState(purchase),
          },
        }));
      } catch (error) {
        set((state) => ({
          deletePurchase: {
            ...state.deletePurchase,
            state: errorState(
              error instanceof Error
                ? error.message
                : "Failed to delete purchase"
            ),
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

  resetPurchasesState: () => {
    set((state) => ({
      purchases: {
        ...state.purchases,
        state: initialState(),
      },
    }));
  },

  resetPurchaseState: () => {
    set((state) => ({
      purchase: {
        ...state.purchase,
        state: initialState(),
      },
    }));
  },

  resetUpdatePurchaseState: () => {
    set((state) => ({
      updatePurchase: {
        ...state.updatePurchase,
        state: initialState(),
      },
    }));
  },

  resetCreatePurchaseState: () => {
    set((state) => ({
      createPurchase: {
        ...state.createPurchase,
        state: initialState(),
      },
    }));
  },

  resetDeletePurchaseState: () => {
    set((state) => ({
      deletePurchase: {
        ...state.deletePurchase,
        state: initialState(),
      },
    }));
  },
}));
