import { create } from "zustand";
import type { AddonState } from "./state";
import {
  errorState,
  initialState,
  loadingState,
  successState,
} from "@/stores/core";
import { addonApi } from "../data";
import type { Addon } from "../domain";

export const useAddonStore = create<AddonState>((set) => ({
  addons: {
    state: initialState(),
    getAllAddons: async () => {
      set((state) => ({
        addons: {
          ...state.addons,
          state: loadingState(),
        },
      }));
      try {
        const addons = await addonApi.getAddons();
        if (!addons?.data) {
          throw new Error("Addons response data is missing");
        }
        set((state) => ({
          addons: {
            ...state.addons,
            state: successState(addons?.data || []),
          },
        }));
      } catch (error) {
        set((state) => ({
          addons: {
            ...state.addons,
            state: errorState(
              error instanceof Error ? error.message : "Failed to fetch addons"
            ),
          },
        }));
      }
    },
  },

  addon: {
    state: initialState(),
    getAddon: async (id: string | number) => {
      set((state) => ({
        addon: {
          ...state.addon,
          state: loadingState(),
        },
      }));
      try {
        const addon = await addonApi.getAddon(id);
        if (!addon?.data) {
          throw new Error("Addon response data is missing");
        }
        set((state) => ({
          addon: {
            ...state.addon,
            state: successState(addon?.data as Addon),
          },
        }));
      } catch (error) {
        set((state) => ({
          addon: {
            ...state.addon,
            state: errorState(
              error instanceof Error ? error.message : "Failed to fetch addon"
            ),
          },
        }));
      }
    },
  },

  updateAddon: {
    state: initialState(),
    updateAddon: async (id: string | number, data) => {
      set((state) => ({
        updateAddon: {
          ...state.updateAddon,
          state: loadingState(),
        },
      }));
      try {
        const addon = await addonApi.updateAddon(id, data);
        if (!addon?.data) {
          throw new Error("Addon response data is missing");
        }
        set((state) => ({
          updateAddon: {
            ...state.updateAddon,
            state: successState(addon),
          },
        }));
      } catch (error) {
        set((state) => ({
          updateAddon: {
            ...state.updateAddon,
            state: errorState(
              error instanceof Error ? error.message : "Failed to update addon"
            ),
          },
        }));
      }
    },
  },

  createAddon: {
    state: initialState(),
    createAddon: async (data) => {
      set((state) => ({
        createAddon: {
          ...state.createAddon,
          state: loadingState(),
        },
      }));
      try {
        const addon = await addonApi.createAddon(data);
        if (!addon?.data) {
          throw new Error("Addon response data is missing");
        }
        set((state) => ({
          createAddon: {
            ...state.createAddon,
            state: successState(addon),
          },
        }));
      } catch (error) {
        set((state) => ({
          createAddon: {
            ...state.createAddon,
            state: errorState(
              error instanceof Error ? error.message : "Failed to create addon"
            ),
          },
        }));
      }
    },
  },

  deleteAddon: {
    state: initialState(),
    deleteAddon: async (id: string | number) => {
      set((state) => ({
        deleteAddon: {
          ...state.deleteAddon,
          state: loadingState(),
        },
      }));
      try {
        const response = await addonApi.deleteAddon(id);
        if (!response) {
          throw new Error("Delete addon response is missing");
        }
        set((state) => ({
          deleteAddon: {
            ...state.deleteAddon,
            state: successState(response),
          },
        }));
      } catch (error) {
        set((state) => ({
          deleteAddon: {
            ...state.deleteAddon,
            state: errorState(
              error instanceof Error ? error.message : "Failed to delete addon"
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

  resetAddonsState: () => {
    set((state) => ({
      addons: {
        ...state.addons,
        state: initialState(),
      },
    }));
  },

  resetAddonState: () => {
    set((state) => ({
      addon: {
        ...state.addon,
        state: initialState(),
      },
    }));
  },

  resetUpdateAddonState: () => {
    set((state) => ({
      updateAddon: {
        ...state.updateAddon,
        state: initialState(),
      },
    }));
  },

  resetCreateAddonState: () => {
    set((state) => ({
      createAddon: {
        ...state.createAddon,
        state: initialState(),
      },
    }));
  },

  resetDeleteAddonState: () => {
    set((state) => ({
      deleteAddon: {
        ...state.deleteAddon,
        state: initialState(),
      },
    }));
  },
}));
