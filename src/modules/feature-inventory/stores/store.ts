import { create } from "zustand";
import type { InventoryState } from "./state";
import { errorState, initialState, loadingState, successState } from "@/stores/core";
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
                        state: errorState(error instanceof Error ? error.message : "Failed to fetch inventories"),
                    },
                }));
            }
        },
    },

    inventoryOpnames: {
        state: initialState(),
        getAllInventoryOpnames: async () => {
            set((state) => ({
                inventoryOpnames: {
                    ...state.inventoryOpnames,
                    state: loadingState(),
                },
            }));
            try {
                const opnames = await inventoryApi.getInventoryOpnames();
                if (!opnames?.data) {
                    throw new Error("Inventory opnames response data is missing");
                }
                set((state) => ({
                    inventoryOpnames: {
                        ...state.inventoryOpnames,
                        state: successState(opnames.data || []),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    inventoryOpnames: {
                        ...state.inventoryOpnames,
                        state: errorState(error instanceof Error ? error.message : "Failed to fetch inventory opnames"),
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
                        state: errorState(error instanceof Error ? error.message : "Failed to fetch inventory"),
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
                        state: errorState(error instanceof Error ? error.message : "Failed to update inventory"),
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
                        state: errorState(error instanceof Error ? error.message : "Failed to create inventory"),
                    },
                }));
            }
        },
    },

    createInventoryOpname: {
        state: initialState(),
        createInventoryOpname: async (data) => {
            set((state) => ({
                createInventoryOpname: {
                    ...state.createInventoryOpname,
                    state: loadingState(),
                },
            }));
            try {
                const opname = await inventoryApi.createInventoryOpname(data);
                if (!opname?.data) {
                    throw new Error("Inventory opname response data is missing");
                }
                set((state) => ({
                    createInventoryOpname: {
                        ...state.createInventoryOpname,
                        state: successState(opname),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    createInventoryOpname: {
                        ...state.createInventoryOpname,
                        state: errorState(error instanceof Error ? error.message : "Failed to create inventory opname"),
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
                        state: errorState(error instanceof Error ? error.message : "Failed to delete inventory"),
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

    modalOpname: {
        isOpen: false,
        mode: "create",
        data: null,
        id: null,
        onOpen: (mode, data, id) => {
            set((state) => ({
                modalOpname: {
                    ...state.modalOpname,
                    isOpen: true,
                    mode,
                    id: id ?? null,
                    data: data ?? null,
                },
            }));
        },
        onClose: () => {
            set((state) => ({
                modalOpname: {
                    ...state.modalOpname,
                    isOpen: false,
                    mode: "create",
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

    resetModalOpname: () => {
        set((state) => ({
            modalOpname: {
                ...state.modalOpname,
                isOpen: false,
                mode: "create",
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

    resetInventoryOpnamesState: () => {
        set((state) => ({
            inventoryOpnames: {
                ...state.inventoryOpnames,
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

    resetCreateInventoryOpnameState: () => {
        set((state) => ({
            createInventoryOpname: {
                ...state.createInventoryOpname,
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
