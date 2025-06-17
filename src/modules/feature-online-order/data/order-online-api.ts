import { ENDPOINTS, type ApiResponse } from "@/lib/api";
import axiosInstance from "@/lib/api/axios";
import { isAxiosError } from "axios";
import type { UpdateOrderStatusDTOType } from "./order-online-dto";
import type { OnlineOrder } from "../domain";

export const orderOnlineApi = {
    getOnlineOrders: async () => {
        try {
            const response = await axiosInstance.get<ApiResponse<OnlineOrder[]>>(ENDPOINTS.ORDER, {
                params: {
                    type: "ONLINE",
                    status: "PROCESSING",
                },
            });
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },
    updateOrderStatus: async (id: string | number, data: UpdateOrderStatusDTOType) => {
        try {
            const response = await axiosInstance.put<ApiResponse<null>>(`${ENDPOINTS.ORDER}/status/${id}`, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },
};
