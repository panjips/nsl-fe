import type { ViewState } from "@/stores/core";
import type { ApiResponse } from "@/lib/api";

export interface SharedState {
    store: {
        state: ViewState<ApiResponse<null>, string>;
        openStore: (data: { isOpen: boolean }) => Promise<void>;
    };

    getStatusStore: {
        state: ViewState<{ isOpen: boolean }, string>;
        getStatusStore: () => Promise<void>;
    };

    resetStoreState: () => void;
}
