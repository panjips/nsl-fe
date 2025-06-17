import { useEffect } from "react";
import { OrderStatus } from "../data";
import { onlineOrderStore } from "../stores";
import { toast } from "sonner";

export const useOnlineOrderStatus = () => {
    const { updateOrderStatus, resetUpdateOrderStatusState, modalTable, onlineOrders, resetModalTabel } =
        onlineOrderStore();

    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            modalTable.onClose();
        }
    };

    const handleUpdateStatus = async (id: string | number) => {
        try {
            await updateOrderStatus.updateOrderStatus(id, { order_status: OrderStatus.COMPLETED });
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
            toast.success("Reservation status updated successfully");
        }
        if (updateOrderStatus.state.state === "error") {
            toast.error(updateOrderStatus.state.error || "Failed to update reservation status");
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
