import type { ViewState } from "@/stores/core";
import type { PelangganStatistik, TopProduct } from "../domain";

export interface DashboardState {
    statistics: {
        state: ViewState<PelangganStatistik[], string>;
        getStatistics: () => Promise<void>;
    };

    topProducts: {
        state: ViewState<TopProduct[], string>;
        getTopProducts: () => Promise<void>;
    };

    resetStatisticsState: () => void;
    resetTopProductsState: () => void;
}
