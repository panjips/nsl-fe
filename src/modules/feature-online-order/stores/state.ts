import type { CreateOrderProductItemDTOType } from "@/modules/feature-pos";
import type { ViewState } from "@/stores";
import type { OnlineOrder } from "../domain";
import type { ApiResponse } from "@/lib/api";
import type { UpdateOrderStatusDTOType } from "../data";

export interface OnlineOrderState {
    onlineOrders: {
        state: ViewState<OnlineOrder[], string>;
        getAllOnlineOrders: () => Promise<void>;
    };
    updateOrderStatus: {
        state: ViewState<ApiResponse<null>, string>;
        updateOrderStatus: (id: string | number, data: UpdateOrderStatusDTOType) => Promise<void>;
    };
    modalTable: {
        isOpen: boolean;
        mode: "detail" | "edit" | null;
        data?: OnlineOrder | null;
        id?: string | number | null;
        onOpen: (mode: "detail" | "edit", id?: number | string, data?: OnlineOrder | null) => void;
        onClose: () => void;
    };
    modal: {
        isOpen: boolean;
        mode: "review" | "payment" | null;
        data?: CreateOrderProductItemDTOType[] | null;
        onOpen: (mode: "review" | "payment", data?: CreateOrderProductItemDTOType[] | null) => void;
        onClose: () => void;
    };
    resetModalTabel: () => void;
    resetModal: () => void;
    resetOnlineOrdersState: () => void;
    resetUpdateOrderStatusState: () => void;
}
