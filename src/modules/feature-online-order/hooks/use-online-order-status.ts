import { useEffect } from "react";
import { OrderStatus } from "../data";
import { onlineOrderStore } from "../stores";
import { toast } from "sonner";
import type { OrderProductItem } from "../domain";
import { useStrickerStore } from "@/stores/sticker";
import type { CartItem } from "@/modules/feature-pos";

const convertOrderProductItemToCartItem = (items: OrderProductItem[]): CartItem[] => {
    return items.map((item) => ({
        id: item.id.toString(),
        productId: item.product_id,
        name: item.product.name,
        price: parseFloat(item.price),
        quantity: item.quantity,
        possibleQty: item.product.possible_qty,
        addOns: item.addons.map((addon) => ({
            ...addon.addon,
            quantity: addon.quantity,
        })),
    }));
};

export const useOnlineOrderStatus = () => {
    const { updateOrderStatus, resetUpdateOrderStatusState, modalTable, onlineOrders, resetModalTabel } =
        onlineOrderStore();
    const { modalStricker } = useStrickerStore();

    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            modalTable.onClose();
        }
    };

    const handleUpdateStatus = async (id: string | number, data?: OrderProductItem[]) => {
        try {
            await updateOrderStatus.updateOrderStatus(id, { order_status: OrderStatus.COMPLETED });
            if (data) {
                console.log(convertOrderProductItemToCartItem(data));
                modalStricker.onOpen(convertOrderProductItemToCartItem(data));
            }
            await onlineOrders.getAllOnlineOrders();
        } catch (error) {
            console.error("Failed to update reservation status:", error);
        } finally {
            modalTable.onClose();
            resetModalTabel();
        }
    };

    useEffect(() => {
        if (updateOrderStatus.state.state === "success") {
            toast.success("Order status updated successfully");
        }
        if (updateOrderStatus.state.state === "error") {
            toast.error(updateOrderStatus.state.error || "Failed to update order status");
        }

        return () => {
            resetUpdateOrderStatusState();
        };
    }, [updateOrderStatus.state.state, resetUpdateOrderStatusState]);

    return {
        handleUpdateStatus,
        isLoading: updateOrderStatus.state.state === "loading",
        isOpen: modalTable.isOpen && modalTable.mode === "edit",
        onOpenChange,
        isError: updateOrderStatus.state.state === "error",
        error: updateOrderStatus.state.state === "error" ? updateOrderStatus.state.error : null,
    };
};
