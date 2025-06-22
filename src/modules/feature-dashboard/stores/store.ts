import { create } from "zustand";
import type { DashboardState } from "./state";
import { errorState, initialState, loadingState, successState } from "@/stores/core";
import { dashboardApi } from "../data";
import type { PelangganStatistik, TopProduct } from "../domain";

export const useDashboardStore = create<DashboardState>((set) => ({
    statistics: {
        state: initialState(),
        getStatistics: async () => {
            set((state) => ({
                statistics: {
                    ...state.statistics,
                    state: loadingState(),
                },
            }));
            try {
                const response = await dashboardApi.getStatistics();
                if (!response?.data) {
                    throw new Error("Statistics response data is missing");
                }
                set((state) => ({
                    statistics: {
                        ...state.statistics,
                        state: successState(response.data as PelangganStatistik[]),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    statistics: {
                        ...state.statistics,
                        state: errorState(error instanceof Error ? error.message : "Failed to fetch statistics"),
                    },
                }));
            }
        },
    },

    topProducts: {
        state: initialState(),
        getTopProducts: async () => {
            set((state) => ({
                topProducts: {
                    ...state.topProducts,
                    state: loadingState(),
                },
            }));
            try {
                const response = await dashboardApi.getTopProducts();
                if (!response?.data) {
                    throw new Error("Top products response data is missing");
                }
                set((state) => ({
                    topProducts: {
                        ...state.topProducts,
                        state: successState(response.data as TopProduct[]),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    topProducts: {
                        ...state.topProducts,
                        state: errorState(error instanceof Error ? error.message : "Failed to fetch top products"),
                    },
                }));
            }
        },
    },

    resetStatisticsState: () => set((state) => ({ statistics: { ...state.statistics, state: initialState() } })),
    resetTopProductsState: () => set((state) => ({ topProducts: { ...state.topProducts, state: initialState() } })),
}));
