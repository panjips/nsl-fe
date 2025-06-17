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
}));
