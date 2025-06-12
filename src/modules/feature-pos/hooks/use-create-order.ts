import { useEffect, useState } from "react";
import { useOrderStore, useCartStore } from "../stores";
import { OrderType } from "../domain";
import type { CreateOrderDTOType, CreateOrderProductItemDTOType } from "../data";
import { toast } from "sonner";

export const useCreateOrder = () => {
    const { createOrder, resetCreateOrderState, modal, resetModal } = useOrderStore();
    const { items: cart, removeItem } = useCartStore();
    const [showMidtransPayment, setShowMidtransPayment] = useState(false);

    const handleCreateOrder = async (paymentType: string, notes: string) => {
        try {
            if (cart.length === 0) {
                toast.error("Cannot create an order with an empty cart");
                return false;
            }
            const orderData: CreateOrderDTOType = {
                order_type: OrderType.OFFLINE,
                payment_type: paymentType,
                notes: notes || undefined,
                items: modal.data as [CreateOrderProductItemDTOType, ...CreateOrderProductItemDTOType[]],
            };

            await createOrder.createOrder(orderData);
        } finally {
            cart.forEach((item) => removeItem(item.id));
            resetModal();
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
