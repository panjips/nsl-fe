import { ENDPOINTS, type ApiResponse } from "@/lib/api";
import type { CreateOrderDTOType } from "./order-dto";
import { isAxiosError } from "axios";
import axiosInstance from "@/lib/api/axios";
import type { OrderResponse } from "../domain";

export const orderApi = {
    createOrder: async (data: CreateOrderDTOType) => {
        try {
            const response = await axiosInstance.post<ApiResponse<OrderResponse>>(ENDPOINTS.ORDER, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },
};
