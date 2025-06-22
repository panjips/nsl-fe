import { create } from "zustand";
import type { ReportState } from "./state";
import { errorState, initialState, loadingState, successState } from "@/stores/core";
import { reportApi } from "../data";
import type {
    InventoryUsageReport,
    InventoryPurchaseReport,
    ProductSalesReportParams,
    SalesData,
    ReservationReport,
    RevenueReport,
} from "../domain";

export const useReportStore = create<ReportState>((set) => ({
    productSales: {
        state: initialState(),
        generateProductReport: async (params: ProductSalesReportParams) => {
            set((state) => ({
                productSales: {
                    ...state.productSales,
                    state: loadingState(),
                },
            }));
            try {
                const report = await reportApi.generateProductReport(params);
                if (!report?.data) {
                    throw new Error("Product sales report response data is missing");
                }
                set((state) => ({
                    productSales: {
                        ...state.productSales,
                        state: successState(report.data as SalesData),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    productSales: {
                        ...state.productSales,
                        state: errorState(
                            error instanceof Error ? error.message : "Failed to generate product sales report",
                        ),
                    },
                }));
            }
        },
    },
    inventoryUsage: {
        state: initialState(),
        generateInventoryUsageReport: async (params) => {
            set((state) => ({
                inventoryUsage: {
                    ...state.inventoryUsage,
                    state: loadingState(),
                },
            }));
            try {
                const report = await reportApi.generateInventoryUsageReport(params);
                if (!report?.data) {
                    throw new Error("Inventory usage report response data is missing");
                }
                set((state) => ({
                    inventoryUsage: {
                        ...state.inventoryUsage,
                        state: successState(report.data as InventoryUsageReport[]),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    inventoryUsage: {
                        ...state.inventoryUsage,
                        state: errorState(
                            error instanceof Error ? error.message : "Failed to generate inventory usage report",
                        ),
                    },
                }));
            }
        },
    },
    inventoryPurchase: {
        state: initialState(),
        generateInventoryPurchaseReport: async (params) => {
            set((state) => ({
                inventoryPurchase: {
                    ...state.inventoryPurchase,
                    state: loadingState(),
                },
            }));
            try {
                const report = await reportApi.generateInventoryPurchaseReport(params);
                if (!report?.data) {
                    throw new Error("Inventory purchase report response data is missing");
                }
                set((state) => ({
                    inventoryPurchase: {
                        ...state.inventoryPurchase,
                        state: successState(report.data as InventoryPurchaseReport[]),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    inventoryPurchase: {
                        ...state.inventoryPurchase,
                        state: errorState(
                            error instanceof Error ? error.message : "Failed to generate inventory purchase report",
                        ),
                    },
                }));
            }
        },
    },

    reservationCatering: {
        state: initialState(),
        generateReservationCateringReport: async (params) => {
            set((state) => ({
                reservationCatering: {
                    ...state.reservationCatering,
                    state: loadingState(),
                },
            }));
            try {
                const report = await reportApi.generateReservationCateringReport(params);
                if (!report?.data) {
                    throw new Error("Reservation catering report response data is missing");
                }
                set((state) => ({
                    reservationCatering: {
                        ...state.reservationCatering,
                        state: successState(report.data as ReservationReport[]),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    reservationCatering: {
                        ...state.reservationCatering,
                        state: errorState(
                            error instanceof Error ? error.message : "Failed to generate reservation catering report",
                        ),
                    },
                }));
            }
        },
    },

    revenue: {
        state: initialState(),
        generateRevenueReport: async (params) => {
            set((state) => ({
                revenue: {
                    ...state.revenue,
                    state: loadingState(),
                },
            }));
            try {
                const report = await reportApi.generateRevenueReport(params);
                if (!report?.data) {
                    throw new Error("Revenue report response data is missing");
                }
                set((state) => ({
                    revenue: {
                        ...state.revenue,
                        state: successState(report.data as RevenueReport),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    revenue: {
                        ...state.revenue,
                        state: errorState(error instanceof Error ? error.message : "Failed to generate revenue report"),
                    },
                }));
            }
        },
    },

    resetProductSalesState: () => {
        set((state) => ({
            productSales: {
                ...state.productSales,
                state: initialState(),
            },
        }));
    },
    resetInventoryUsageState: () => {
        set((state) => ({
            inventoryUsage: {
                ...state.inventoryUsage,
                state: initialState(),
            },
        }));
    },
    resetInventoryPurchaseState: () => {
        set((state) => ({
            inventoryPurchase: {
                ...state.inventoryPurchase,
                state: initialState(),
            },
        }));
    },
    resetReservationCatering: () =>
        set((state) => ({
            reservationCatering: {
                ...state.reservationCatering,
                state: initialState(),
            },
        })),

    resetRevenueState: () =>
        set((state) => ({
            revenue: {
                ...state.revenue,
                state: initialState(),
            },
        })),
}));
