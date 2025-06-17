import { ENDPOINTS, type ApiResponse } from "@/lib/api";
import axiosInstance from "@/lib/api/axios";
import { isAxiosError } from "axios";
import type { OnlineOrder as Order } from "@/modules/feature-online-order";

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
};
