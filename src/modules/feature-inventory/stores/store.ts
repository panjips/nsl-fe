import { create } from "zustand";
import type { InventoryState } from "./state";
import {
  errorState,
  initialState,
  loadingState,
  successState,
} from "@/stores/core";
import { inventoryApi } from "../data";
import type { Inventory } from "../domain";

export const useInventoryStore = create<InventoryState>((set) => ({
  inventories: {
    state: initialState(),
    getAllInventories: async () => {
      set((state) => ({
        inventories: {
          ...state.inventories,
          state: loadingState(),
        },
      }));
      try {
        const inventories = await inventoryApi.getInventories();
        if (!inventories?.data) {
          throw new Error("Inventories response data is missing");
        }
        set((state) => ({
          inventories: {
            ...state.inventories,
            state: successState(inventories?.data || []),
          },
        }));
      } catch (error) {
        set((state) => ({
          inventories: {
            ...state.inventories,
            state: errorState(
              error instanceof Error
                ? error.message
                : "Failed to fetch inventories"
            ),
          },
        }));
      }
    },
  },

  inventory: {
    state: initialState(),
    getInventory: async (id: string | number) => {
      set((state) => ({
        inventory: {
          ...state.inventory,
          state: loadingState(),
        },
      }));
      try {
        const inventory = await inventoryApi.getInventory(id);
        if (!inventory?.data) {
          throw new Error("Inventory response data is missing");
        }
        set((state) => ({
          inventory: {
            ...state.inventory,
            state: successState(inventory.data as Inventory),
          },
        }));
      } catch (error) {
        set((state) => ({
          inventory: {
            ...state.inventory,
            state: errorState(
              error instanceof Error
                ? error.message
                : "Failed to fetch inventory"
            ),
          },
        }));
      }
    },
  },

  updateInventory: {
    state: initialState(),
    updateInventory: async (id: string | number, data) => {
      set((state) => ({
        updateInventory: {
          ...state.updateInventory,
          state: loadingState(),
        },
      }));
      try {
        const inventory = await inventoryApi.updateInventory(id, data);
        if (!inventory?.data) {
          throw new Error("Inventory response data is missing");
        }
        set((state) => ({
          updateInventory: {
            ...state.updateInventory,
            state: successState(inventory),
          },
        }));
      } catch (error) {
        set((state) => ({
          updateInventory: {
            ...state.updateInventory,
            state: errorState(
              error instanceof Error
                ? error.message
                : "Failed to update inventory"
            ),
          },
        }));
      }
    },
  },

  createInventory: {
    state: initialState(),
    createInventory: async (data) => {
      set((state) => ({
        createInventory: {
          ...state.createInventory,
          state: loadingState(),
        },
      }));
      try {
        const inventory = await inventoryApi.createInventory(data);
        if (!inventory?.data) {
          throw new Error("Inventory response data is missing");
        }
        set((state) => ({
          createInventory: {
            ...state.createInventory,
            state: successState(inventory),
          },
        }));
      } catch (error) {
        set((state) => ({
          createInventory: {
            ...state.createInventory,
            state: errorState(
              error instanceof Error
                ? error.message
                : "Failed to create inventory"
            ),
          },
        }));
      }
    },
  },

  deleteInventory: {
    state: initialState(),
    deleteInventory: async (id: string | number) => {
      set((state) => ({
        deleteInventory: {
          ...state.deleteInventory,
          state: loadingState(),
        },
      }));
      try {
        const inventory = await inventoryApi.deleteInventory(id);
        if (!inventory) {
          throw new Error("Delete inventory response is missing");
        }
        set((state) => ({
          deleteInventory: {
            ...state.deleteInventory,
            state: successState(inventory),
          },
        }));
      } catch (error) {
        set((state) => ({
          deleteInventory: {
            ...state.deleteInventory,
            state: errorState(
              error instanceof Error
                ? error.message
                : "Failed to delete inventory"
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

  resetInventoriesState: () => {
    set((state) => ({
      inventories: {
        ...state.inventories,
        state: initialState(),
      },
    }));
  },

  resetInventoryState: () => {
    set((state) => ({
      inventory: {
        ...state.inventory,
        state: initialState(),
      },
    }));
  },

  resetUpdateInventoryState: () => {
    set((state) => ({
      updateInventory: {
        ...state.updateInventory,
        state: initialState(),
      },
    }));
  },

  resetCreateInventoryState: () => {
    set((state) => ({
      createInventory: {
        ...state.createInventory,
        state: initialState(),
      },
    }));
  },

  resetDeleteInventoryState: () => {
    set((state) => ({
      deleteInventory: {
        ...state.deleteInventory,
        state: initialState(),
      },
    }));
  },
}));
