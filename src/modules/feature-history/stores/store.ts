import { create } from "zustand";
import type { HistoryState } from "./state";
import { errorState, initialState, loadingState, successState } from "@/stores/core";
import { historyApi } from "../data/history-api";

export const useHistoryStore = create<HistoryState>((set) => ({
    myTransactions: {
        state: initialState(),
        getMyTransactions: async () => {
            set((state) => ({
                myTransactions: {
                    ...state.myTransactions,
                    state: loadingState(),
                },
            }));
            try {
                const transactions = await historyApi.getMyTransactions();
                if (!transactions?.data) {
                    throw new Error("Transactions response data is missing");
                }
                set((state) => ({
                    myTransactions: {
                        ...state.myTransactions,
                        state: successState(transactions?.data || []),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    myTransactions: {
                        ...state.myTransactions,
                        state: errorState(error instanceof Error ? error.message : "Failed to fetch transactions"),
                    },
                }));
            }
        },
    },
    transactions: {
        state: initialState(),
        getTransactions: async () => {
            set((state) => ({
                transactions: {
                    ...state.transactions,
                    state: loadingState(),
                },
            }));
            try {
                const transactions = await historyApi.getTransactions();
                if (!transactions?.data) {
                    throw new Error("Transactions response data is missing");
                }
                set((state) => ({
                    transactions: {
                        ...state.transactions,
                        state: successState(transactions?.data || []),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    transactions: {
                        ...state.transactions,
                        state: errorState(error instanceof Error ? error.message : "Failed to fetch transactions"),
                    },
                }));
            }
        },
    },

    inventoryUsageHistory: {
        state: initialState(),
        getInventoryUsageHistory: async () => {
            set((state) => ({
                inventoryUsageHistory: {
                    ...state.inventoryUsageHistory,
                    state: loadingState(),
                },
            }));
            try {
                const usageHistory = await historyApi.getInventoryUsageHistory();
                if (!usageHistory?.data) {
                    throw new Error("Inventory usage history response data is missing");
                }
                set((state) => ({
                    inventoryUsageHistory: {
                        ...state.inventoryUsageHistory,
                        state: successState(usageHistory?.data || []),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    inventoryUsageHistory: {
                        ...state.inventoryUsageHistory,
                        state: errorState(
                            error instanceof Error ? error.message : "Failed to fetch inventory usage history",
                        ),
                    },
                }));
            }
        },
    },

    reservations: {
        state: initialState(),
        getReservations: async (params?: any) => {
            set((state) => ({
                reservations: {
                    ...state.reservations,
                    state: loadingState(),
                },
            }));
            try {
                const reservations = await historyApi.getReservations(params);
                if (!reservations?.data) {
                    throw new Error("Reservations response data is missing");
                }
                set((state) => ({
                    reservations: {
                        ...state.reservations,
                        state: successState(reservations?.data || []),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    reservations: {
                        ...state.reservations,
                        state: errorState(error instanceof Error ? error.message : "Failed to fetch reservations"),
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

    resetTransactionsState: () => {
        set((state) => ({
            transactions: {
                ...state.transactions,
                state: initialState(),
            },
        }));
    },

    resetMyTransactionsState: () => {
        set((state) => ({
            myTransactions: {
                ...state.myTransactions,
                state: initialState(),
            },
        }));
    },
    resetInventoryUsageHistoryState: () => {
        set((state) => ({
            inventoryUsageHistory: {
                ...state.inventoryUsageHistory,
                state: initialState(),
            },
        }));
    },

    resetReservationsState: () => {
        set((state) => ({
            reservations: {
                ...state.reservations,
                state: initialState(),
            },
        }));
    },
}));
