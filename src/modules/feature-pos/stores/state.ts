import type { ViewState } from "@/stores";
import { type CartItem, type OrderResponse } from "../domain";
import type { CreateOrderDTOType, CreateOrderProductItemDTOType } from "../data";
import type { ApiResponse } from "@/lib/api";

export interface CartState {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "id">) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    itemCount: () => number;
    totalAmount: () => number;
}

export interface OrderState {
    createOrder: {
        state: ViewState<ApiResponse<OrderResponse>, string>;
        createOrder: (data: CreateOrderDTOType) => Promise<void>;
    };
    resetCreateOrderState: () => void;
    modal: {
        isOpen: boolean;
        mode: "create" | "edit" | "delete" | null;
        data?: CreateOrderProductItemDTOType[] | null;
        id?: string | number | null;
        onOpen: (
            mode: "create" | "edit" | "delete",
            data?: CreateOrderProductItemDTOType[] | null,
            id?: string | number,
        ) => void;
        onClose: () => void;
    };

    modalInvoice: {
        isOpen: boolean;
        mode?: "view";
        data?: CartItem[];
        onOpen: ( data: CartItem[]) => void;
        onClose: () => void;
    };
    resetModalInvoice: () => void;
    resetModal: () => void;
}
