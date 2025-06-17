import type { OnlineOrder } from "@/modules/feature-online-order";
import type { ViewState } from "@/stores";

export interface HistoryState {
    myTransactions: {
        state: ViewState<OnlineOrder[], string>;
        getMyTransactions: () => Promise<void>;
    };
    transactions: {
        state: ViewState<OnlineOrder[], string>;
        getTransactions: () => Promise<void>;
    };

    modal: {
        isOpen: boolean;
        mode: "detail" | null;
        data?: OnlineOrder | null;
        id?: string | number | null;
        onOpen: (mode: "detail", data?: OnlineOrder | null, id?: string | number) => void;
        onClose: () => void;
    };
    resetModal: () => void;
    resetTransactionsState: () => void;
    resetMyTransactionsState: () => void;
}
