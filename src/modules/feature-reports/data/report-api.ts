import { ENDPOINTS, type ApiResponse } from "@/lib/api";
import axiosInstance from "@/lib/api/axios";
import { isAxiosError } from "axios";
import type {
    BaseReportParams,
    InventoryPurchaseReport,
    InventoryUsageReport,
    ProductSalesReportParams,
    ReservationReport,
    RevenueReport,
    SalesData,
} from "../domain";

export const reportApi = {
    generateProductReport: async (params: ProductSalesReportParams) => {
        try {
            const response = await axiosInstance.get<ApiResponse<SalesData>>(`${ENDPOINTS.REPORT}/product-sales`, {
                params: params,
            });
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data?.message || "Failed to generate product sales report");
            }
            throw new Error("An unexpected error occurred while generating the product sales report");
        }
    },

    generateInventoryUsageReport: async (params: BaseReportParams) => {
        try {
            const response = await axiosInstance.get<ApiResponse<InventoryUsageReport[]>>(
                `${ENDPOINTS.REPORT}/inventory-usage`,
                {
                    params: params,
                },
            );
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data?.message || "Failed to generate inventory usage report");
            }
            throw new Error("An unexpected error occurred while generating the inventory usage report");
        }
    },

    generateInventoryPurchaseReport: async (params: BaseReportParams) => {
        try {
            const response = await axiosInstance.get<ApiResponse<InventoryPurchaseReport[]>>(
                `${ENDPOINTS.REPORT}/inventory-purchase`,
                {
                    params: params,
                },
            );
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data?.message || "Failed to generate inventory usage report");
            }
            throw new Error("An unexpected error occurred while generating the inventory usage report");
        }
    },

    generateReservationCateringReport: async (params: BaseReportParams) => {
        try {
            const response = await axiosInstance.get<ApiResponse<ReservationReport[]>>(
                `${ENDPOINTS.REPORT}/reservation-catering`,
                {
                    params: params,
                },
            );
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data?.message || "Failed to generate reservation catering report");
            }
            throw new Error("An unexpected error occurred while generating the reservation catering report");
        }
    },

    generateRevenueReport: async (params: BaseReportParams) => {
        try {
            const response = await axiosInstance.get<ApiResponse<RevenueReport>>(`${ENDPOINTS.REPORT}/revenue`, {
                params: params,
            });
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data?.message || "Failed to generate revenue report");
            }
            throw new Error("An unexpected error occurred while generating the revenue report");
        }
    },
};
