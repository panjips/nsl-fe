import { create } from "zustand";
import type { CartState, OrderState } from "./state";
import { errorState, initialState, loadingState, successState } from "@/stores";
import { orderApi } from "../data/order-api";

export const useCartStore = create<CartState>((set, get) => ({
    items: [],

    addItem: (itemData) => {
        const id = `${itemData.productId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newItem = { ...itemData, id };
        set((state) => ({ items: [...state.items, newItem] }));
    },

    updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
            get().removeItem(id);
            return;
        }

        set((state) => ({
            items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        }));
    },

    removeItem: (id) => {
        set((state) => ({
            items: state.items.filter((item) => item.id !== id),
        }));
    },

    clearCart: () => {
        set({ items: [] });
    },

    itemCount: () => {
        return get().items.reduce((sum, item) => Number(sum) + Number(item.quantity), 0);
    },

    totalAmount: () => {
        return get().items.reduce((sum, item) => {
            const itemPrice = Number.parseFloat(item.price.toString());
            const itemQuantity = Number.parseInt(item.quantity.toString());
            const itemTotal = Number(itemPrice) * Number(itemQuantity);

            return Number(sum) + Number(itemTotal);
        }, 0);
    },
}));

export const useOrderStore = create<OrderState>((set) => ({
    createOrder: {
        state: initialState(),
        createOrder: async (data) => {
            set((state) => ({
                createOrder: {
                    ...state.createOrder,
                    state: loadingState(),
                },
            }));
            try {
                const order = await orderApi.createOrder(data);
                if (!order?.data) {
                    throw new Error("Order response data is missing");
                }
                set((state) => ({
                    createOrder: {
                        ...state.createOrder,
                        state: successState(order),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    createOrder: {
                        ...state.createOrder,
                        state: errorState(error instanceof Error ? error.message : "Failed to create order"),
                    },
                }));
            }
        },
    },
    resetCreateOrderState: () => {
        set((state) => ({
            createOrder: {
                ...state.createOrder,
                state: initialState(),
            },
        }));
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
                    id: null,
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
}));
