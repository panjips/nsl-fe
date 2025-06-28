import { useEffect, useState } from "react";
import {
    useOrderStore,
    OrderType,
    type CreateOrderDTOType,
    type CreateOrderProductItemDTOType,
} from "@/modules/feature-pos";
import { toast } from "sonner";
import { onlineOrderStore } from "../stores";
import type { CartProduct } from "./use-carts";
import { useGlobalAuthStore } from "@/stores";

export const useCheckout = () => {
    const [showMidtransPayment, setShowMidtransPayment] = useState(false);
    const { createOrder, resetCreateOrderState } = useOrderStore();
    const { modal } = onlineOrderStore();
    const { user } = useGlobalAuthStore();

    const handleCreateOrder = async (cart: CartProduct[], notes: string) => {
        try {
            if (cart.length === 0) {
                toast.error("Cannot create an order with an empty cart");
                return false;
            }

            const orderData: CreateOrderDTOType = {
                user_id: user?.id ? Number(user.id) : undefined,
                order_type: OrderType.ONLINE,
                payment_type: "QRIS MIDTRANS",
                notes: notes || undefined,
                items: cart as [CreateOrderProductItemDTOType, ...CreateOrderProductItemDTOType[]],
            };

            await createOrder.createOrder(orderData);
        } finally {
            modal.onClose();
            resetCreateOrderState();
        }
    };

    useEffect(() => {
        if (createOrder.state.state === "success") {
            toast.success("Order created successfully");
            if (createOrder.state.data?.data?.token) {
                setShowMidtransPayment(true);
            }
        }

        if (createOrder.state.state === "error") {
            toast.error(createOrder.state.error || "Failed to create order");
        }
        toast.dismiss();
    }, [createOrder.state.state]);

    return {
        isSubmitting: createOrder.state.state === "loading",
        createOrderState: createOrder.state,
        createOrder: handleCreateOrder,
        resetOrderState: resetCreateOrderState,
        showMidtransPayment,
        setShowMidtransPayment,
    };
};
