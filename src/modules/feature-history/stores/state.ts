import type { OnlineOrder } from "@/modules/feature-online-order";
import type { ViewState } from "@/stores";
import type { OrderInventoryUsage } from "../domain";
import type { ReservationWithOrderCateringAndPackage } from "@/modules/feature-reservation";

export interface HistoryState {
    myTransactions: {
        state: ViewState<OnlineOrder[], string>;
        getMyTransactions: () => Promise<void>;
    };
    transactions: {
        state: ViewState<OnlineOrder[], string>;
        getTransactions: () => Promise<void>;
    };
    inventoryUsageHistory: {
        state: ViewState<OrderInventoryUsage[], string>;
        getInventoryUsageHistory: () => Promise<void>;
    };
    reservations: {
        state: ViewState<ReservationWithOrderCateringAndPackage[], string>;
        getReservations: (params?: any) => Promise<void>;
    };
    repaymentToken: {
        state: ViewState<{ token: string }, string>;
        getRepaymentToken: (id: string | number) => Promise<void>;
    };

    modal: {
        isOpen: boolean;
        mode: "detail" | null;
        data?: any | null;
        id?: string | number | null;
        onOpen: (mode: "detail", data?: any | null, id?: string | number) => void;
        onClose: () => void;
    };

    modalRepayment: {
        isOpen: boolean;
        mode: "repayment" | "loading" | null;
        data?: string | null;
        id?: string | number | null;
        onOpen: (mode: "repayment" | "loading", data?: string | null, id?: string | number) => void;
        onClose: () => void;
    };

    resetModal: () => void;
    resetModalRepayment: () => void;
    resetRepaymentToken: () => void;
    resetTransactionsState: () => void;
    resetMyTransactionsState: () => void;
    resetInventoryUsageHistoryState: () => void;
    resetReservationsState: () => void;
}
