import { ENDPOINTS, type ApiResponse } from "@/lib/api";
import axiosInstance from "@/lib/api/axios";
import { isAxiosError } from "axios";

export const sharedApi = {
    openStore: async (data: { isOpen: boolean }) => {
        try {
            const response = await axiosInstance.post<ApiResponse<null>>(ENDPOINTS.OPEN_STORE, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },

    getStatusStore: async () => {
        try {
            const response = await axiosInstance.get<ApiResponse<{ isOpen: boolean }>>(ENDPOINTS.OPEN_STORE);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },
};
