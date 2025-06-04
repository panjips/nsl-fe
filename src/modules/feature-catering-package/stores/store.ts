import { create } from "zustand";
import { cateringPackageApi } from "../data";
import type { CateringPackageState } from "./state";
import {
  errorState,
  initialState,
  loadingState,
  successState,
} from "@/stores/core";
import type { CreateCateringPackageDTOType } from "../data";
import type { CateringPackage } from "../domain";

export const useCateringPackageStore = create<CateringPackageState>((set) => ({
  cateringPackages: {
    state: initialState(),
    getAllCateringPackages: async () => {
      set((state) => ({
        cateringPackages: {
          ...state.cateringPackages,
          state: loadingState(),
        },
      }));
      try {
        const response = await cateringPackageApi.getCateringPackages();
        if (!response?.data) {
          throw new Error("Catering packages response data is missing");
        }
        set((state) => ({
          cateringPackages: {
            ...state.cateringPackages,
            state: successState(response.data || []),
          },
        }));
      } catch (error) {
        set((state) => ({
          cateringPackages: {
            ...state.cateringPackages,
            state: errorState(
              error instanceof Error
                ? error.message
                : "Failed to fetch catering packages"
            ),
          },
        }));
      }
    },
  },
  
  cateringPackage: {
    state: initialState(),
    getCateringPackage: async (id) => {
      set((state) => ({
        cateringPackage: {
          ...state.cateringPackage,
          state: loadingState(),
        },
      }));
      try {
        const response = await cateringPackageApi.getCateringPackage(id);
        if (!response?.data) {
          throw new Error("Catering package response data is missing");
        }
        set((state) => ({
          cateringPackage: {
            ...state.cateringPackage,
            state: successState(response.data as CateringPackage),
          },
        }));
      } catch (error) {
        set((state) => ({
          cateringPackage: {
            ...state.cateringPackage,
            state: errorState(
              error instanceof Error
                ? error.message
                : "Failed to fetch catering package"
            ),
          },
        }));
      }
    },
  },
  
  updateCateringPackage: {
    state: initialState(),
    updateCateringPackage: async (id, data) => {
      set((state) => ({
        updateCateringPackage: {
          ...state.updateCateringPackage,
          state: loadingState(),
        },
      }));
      try {
        const response = await cateringPackageApi.updateCateringPackage(id, data);
        if (!response) {
          throw new Error("Update catering package response is missing");
        }
        set((state) => ({
          updateCateringPackage: {
            ...state.updateCateringPackage,
            state: successState(response),
          },
        }));
      } catch (error) {
        set((state) => ({
          updateCateringPackage: {
            ...state.updateCateringPackage,
            state: errorState(
              error instanceof Error
                ? error.message
                : "Failed to update catering package"
            ),
          },
        }));
      }
    },
  },
  
  createCateringPackage: {
    state: initialState(),
    createCateringPackage: async (data: CreateCateringPackageDTOType) => {
      set((state) => ({
        createCateringPackage: {
          ...state.createCateringPackage,
          state: loadingState(),
        },
      }));
      try {
        const response = await cateringPackageApi.createCateringPackage(data);
        if (!response) {
          throw new Error("Create catering package response is missing");
        }
        set((state) => ({
          createCateringPackage: {
            ...state.createCateringPackage,
            state: successState(response),
          },
        }));
      } catch (error) {
        set((state) => ({
          createCateringPackage: {
            ...state.createCateringPackage,
            state: errorState(
              error instanceof Error
                ? error.message
                : "Failed to create catering package"
            ),
          },
        }));
      }
    },
  },
  
  deleteCateringPackage: {
    state: initialState(),
    deleteCateringPackage: async (id) => {
      set((state) => ({
        deleteCateringPackage: {
          ...state.deleteCateringPackage,
          state: loadingState(),
        },
      }));
      try {
        const response = await cateringPackageApi.deleteCateringPackage(id);
        if (!response) {
          throw new Error("Delete catering package response is missing");
        }
        set((state) => ({
          deleteCateringPackage: {
            ...state.deleteCateringPackage,
            state: successState(response),
          },
        }));
      } catch (error) {
        set((state) => ({
          deleteCateringPackage: {
            ...state.deleteCateringPackage,
            state: errorState(
              error instanceof Error
                ? error.message
                : "Failed to delete catering package"
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
  
  resetCateringPackagesState: () => {
    set((state) => ({
      cateringPackages: {
        ...state.cateringPackages,
        state: initialState(),
      },
    }));
  },
  
  resetCateringPackageState: () => {
    set((state) => ({
      cateringPackage: {
        ...state.cateringPackage,
        state: initialState(),
      },
    }));
  },
  
  resetUpdateCateringPackageState: () => {
    set((state) => ({
      updateCateringPackage: {
        ...state.updateCateringPackage,
        state: initialState(),
      },
    }));
  },
  
  resetCreateCateringPackageState: () => {
    set((state) => ({
      createCateringPackage: {
        ...state.createCateringPackage,
        state: initialState(),
      },
    }));
  },
  
  resetDeleteCateringPackageState: () => {
    set((state) => ({
      deleteCateringPackage: {
        ...state.deleteCateringPackage,
        state: initialState(),
      },
    }));
  },
}));