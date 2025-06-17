import { create } from "zustand";
import type { OnlineOrderState } from "./state";
import { errorState, initialState, loadingState, successState } from "@/stores";
import { orderOnlineApi } from "../data";

export const onlineOrderStore = create<OnlineOrderState>((set) => ({
    onlineOrders: {
        state: initialState(),
        getAllOnlineOrders: async () => {
            set((state) => ({
                onlineOrders: {
                    ...state.onlineOrders,
                    state: loadingState(),
                },
            }));
            try {
                const onlineOrders = await orderOnlineApi.getOnlineOrders();
                if (!onlineOrders?.data) {
                    throw new Error("Online orders response data is missing");
                }
                set((state) => ({
                    onlineOrders: {
                        ...state.onlineOrders,
                        state: successState(onlineOrders?.data || []),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    onlineOrders: {
                        ...state.onlineOrders,
                        state: errorState(error instanceof Error ? error.message : "Failed to fetch online orders"),
                    },
                }));
            }
        },
    },
    updateOrderStatus: {
        state: initialState(),
        updateOrderStatus: async (id: string | number, data) => {
            set((state) => ({
                updateOrderStatus: {
                    ...state.updateOrderStatus,
                    state: loadingState(),
                },
            }));
            try {
                const response = await orderOnlineApi.updateOrderStatus(id, data);
                if (!response?.data) {
                    throw new Error("Update order status response data is missing");
                }
                set((state) => ({
                    updateOrderStatus: {
                        ...state.updateOrderStatus,
                        state: successState(response),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    updateOrderStatus: {
                        ...state.updateOrderStatus,
                        state: errorState(error instanceof Error ? error.message : "Failed to update order status"),
                    },
                }));
            }
        },
    },
    modalTable: {
        isOpen: false,
        mode: null,
        data: null,
        id: null,
        onOpen: (mode, id, data) => {
            set((state) => ({
                modalTable: {
                    ...state.modalTable,
                    isOpen: true,
                    mode,
                    id: id ?? null,
                    data: data ?? null,
                },
            }));
        },
        onClose: () => {
            set((state) => ({
                modalTable: {
                    ...state.modalTable,
                    isOpen: false,
                    mode: null,
                    data: null,
                    id: null,
                },
            }));
        },
    },
    modal: {
        isOpen: false,
        mode: null,
        data: null,
        onOpen: (mode, data) => {
            set((state) => ({
                modal: {
                    ...state.modal,
                    isOpen: true,
                    mode,
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
    resetModalTabel: () => {
        set((state) => ({
            modalTable: {
                ...state.modalTable,
                isOpen: false,
                mode: null,
                data: null,
                id: null,
            },
        }));
    },
    resetModal: () => {
        set((state) => ({
            modal: {
                ...state.modal,
                isOpen: false,
                mode: null,
                data: null,
            },
        }));
    },
    resetOnlineOrdersState: () => {
        set((state) => ({
            onlineOrders: {
                ...state.onlineOrders,
                state: initialState(),
            },
        }));
    },

    resetUpdateOrderStatusState: () => {
        set((state) => ({
            updateOrderStatus: {
                ...state.updateOrderStatus,
                state: initialState(),
            },
        }));
    },
}));
