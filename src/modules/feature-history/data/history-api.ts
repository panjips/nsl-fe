import { ENDPOINTS, type ApiResponse } from "@/lib/api";
import axiosInstance from "@/lib/api/axios";
import { isAxiosError } from "axios";
import type { OnlineOrder as Order } from "@/modules/feature-online-order";
import type { OrderInventoryUsage } from "../domain";
import type { ReservationWithOrderCateringAndPackage } from "@/modules/feature-reservation";

export const historyApi = {
    getMyTransactions: async () => {
        try {
            const response = await axiosInstance.get<ApiResponse<Order[]>>(`${ENDPOINTS.ORDER}/user`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
        }
    },
    getTransactions: async () => {
        try {
            const response = await axiosInstance.get<ApiResponse<Order[]>>(`${ENDPOINTS.ORDER}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
        }
    },
    getInventoryUsageHistory: async () => {
        try {
            const response = await axiosInstance.get<ApiResponse<OrderInventoryUsage[]>>(
                `${ENDPOINTS.INVENTORY}/usage`,
            );
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
        }
    },
    getReservations: async (params: any) => {
        try {
            const response = await axiosInstance.get<ApiResponse<ReservationWithOrderCateringAndPackage[]>>(
                ENDPOINTS.RESERVATION,
                {
                    params: params,
                },
            );
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },
    getRepaymentToken: async (id: string | number) => {
        try {
            const response = await axiosInstance.get<ApiResponse<{ token: string }>>(
                `${ENDPOINTS.PAYMENT}/${id}/repayment`,
            );
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
        }
    }
};
