import type { ViewState } from "@/stores";
import type {
    BaseReportParams,
    InventoryPurchaseReport,
    InventoryUsageReport,
    ProductSalesReportParams,
    ReservationReport,
    RevenueReport,
    SalesData,
} from "../domain";

export interface ReportState {
    productSales: {
        state: ViewState<SalesData, string>;
        generateProductReport: (params: ProductSalesReportParams) => Promise<void>;
    };

    inventoryUsage: {
        state: ViewState<InventoryUsageReport[], string>;
        generateInventoryUsageReport: (params: BaseReportParams) => Promise<void>;
    };

    inventoryPurchase: {
        state: ViewState<InventoryPurchaseReport[], string>;
        generateInventoryPurchaseReport: (params: BaseReportParams) => Promise<void>;
    };

    reservationCatering: {
        state: ViewState<ReservationReport[], string>;
        generateReservationCateringReport: (params: BaseReportParams) => Promise<void>;
    };

    revenue: {
        state: ViewState<RevenueReport, string>;
        generateRevenueReport: (params: BaseReportParams) => Promise<void>;
    };

    resetProductSalesState: () => void;
    resetInventoryUsageState: () => void;
    resetInventoryPurchaseState: () => void;
    resetReservationCatering: () => void;
    resetRevenueState: () => void;
}
