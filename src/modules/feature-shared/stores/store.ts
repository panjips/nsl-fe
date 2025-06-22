import { create } from "zustand";
import type { SharedState } from "./state";
import { errorState, initialState, loadingState, successState } from "@/stores/core";
import { sharedApi } from "../data";

export const useSharedStore = create<SharedState>((set) => ({
    store: {
        state: initialState(),
        openStore: async (data: { isOpen: boolean }) => {
            set((state) => ({
                store: { ...state.store, state: loadingState() },
            }));
            try {
                const response = await sharedApi.openStore(data);
                set((state) => ({
                    store: {
                        ...state.store,
                        state: successState(response),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    store: {
                        ...state.store,
                        state: errorState(error instanceof Error ? error.message : "Open store failed"),
                    },
                }));
            }
        },
    },

    getStatusStore: {
        state: initialState(),
        getStatusStore: async () => {
            set((state) => ({
                getStatusStore: { ...state.getStatusStore, state: loadingState() },
            }));
            try {
                const response = await sharedApi.getStatusStore();
                set((state) => ({
                    getStatusStore: {
                        ...state.getStatusStore,
                        state: successState(response.data as { isOpen: boolean }),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    getStatusStore: {
                        ...state.getStatusStore,
                        state: errorState(error instanceof Error ? error.message : "Get status store failed"),
                    },
                }));
            }
        },
    },

    resetStoreState: () => {
        set((state) => ({
            store: {
                ...state.store,
                state: initialState(),
            },
        }));
    },
}));
