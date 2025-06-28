import { ENDPOINTS, type ApiResponse } from "@/lib/api";
import axiosInstance from "@/lib/api/axios";
import type { PelangganStatistik, TopProduct } from "../domain";
import { isAxiosError } from "axios";

export const dashboardApi = {
    getStatistics: async (params?: {
        startDate?: string;
        endDate?: string;
    }) => {
        try {
            const response = await axiosInstance.get<ApiResponse<PelangganStatistik[]>>(
                `${ENDPOINTS.DASHBOARD}/statistics`,
                { params },
            );
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },

    getTopProducts: async () => {
        try {
            const response = await axiosInstance.get<ApiResponse<TopProduct[]>>(`${ENDPOINTS.DASHBOARD}/top-products`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },
};
