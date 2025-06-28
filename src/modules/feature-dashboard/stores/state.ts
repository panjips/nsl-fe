import type { ViewState } from "@/stores/core";
import type { PelangganStatistik, TopProduct, DateRangeFilter } from "../domain";

export interface DashboardState {
    statistics: {
        state: ViewState<PelangganStatistik[], string>;
        getStatistics: (params?: {
            startDate?: string;
            endDate?: string;
        }) => Promise<void>;
    };

    topProducts: {
        state: ViewState<TopProduct[], string>;
        getTopProducts: () => Promise<void>;
    };

    dateRange: DateRangeFilter;
    setDateRange: (range: DateRangeFilter) => void;

    resetStatisticsState: () => void;
    resetTopProductsState: () => void;
}
