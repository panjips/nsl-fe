import { create } from "zustand";
import type { CartState, OrderState } from "./state";
import { errorState, initialState, loadingState, successState } from "@/stores";
import { orderApi } from "../data/order-api";
import { toast } from "sonner";

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

        set((state) => {
            const targetItem = state.items.find((item) => item.id === id);

            if (!targetItem) return state;

            let newQuantity = quantity;
            let quantityLimited = false;

            if (targetItem.possibleQty !== undefined && newQuantity > targetItem.possibleQty) {
                newQuantity = targetItem.possibleQty;
                quantityLimited = true;
                toast.warning(`Maximum available quantity for ${targetItem.name} is ${targetItem.possibleQty}`);
            }

            const updatedItems = state.items.map((item) => {
                if (item.id === id) {
                    const updatedAddOns =
                        item.addOns?.map((addon) => {
                            let addonQuantity = newQuantity;

                            if (addon.possible_qty !== undefined && addonQuantity > addon.possible_qty) {
                                addonQuantity = addon.possible_qty;

                                if (addonQuantity < newQuantity) {
                                    newQuantity = addonQuantity;
                                    quantityLimited = true;
                                    toast.warning(
                                        `Maximum available quantity for addon ${addon.name} is ${addon.possible_qty}`,
                                    );
                                }
                            }

                            return {
                                ...addon,
                                quantity: addonQuantity,
                            };
                        }) || [];

                    return {
                        ...item,
                        quantity: newQuantity,
                        addOns: updatedAddOns,
                    };
                }
                return item;
            });

            return { items: updatedItems };
        });
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

    modalInvoice: {
        isOpen: false,
        mode: "view",
        data: undefined,
        onOpen: (data) => {
            set((state) => ({
                modalInvoice: {
                    ...state.modalInvoice,
                    isOpen: true,
                    mode: "view",
                    data: data ?? undefined,
                },
            }));
        },
        onClose: () => {
            set((state) => ({
                modalInvoice: {
                    ...state.modalInvoice,
                    isOpen: false,
                    mode: undefined,
                    data: undefined,
                },
            }));
        },
    },
    resetModalInvoice: () => {
        set((state) => ({
            modalInvoice: {
                ...state.modalInvoice,
                isOpen: false,
                mode: undefined,
                data: undefined,
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
                id: null,
            },
        }));
    },
}));
