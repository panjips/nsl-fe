import { ENDPOINTS, type ApiResponse } from "@/lib/api";
import axiosInstance from "@/lib/api/axios";
import { isAxiosError } from "axios";
import type { TableProduct } from "../domain";

export const productApi = {
    products: async () => {
        try {
            const response = await axiosInstance.get<ApiResponse<TableProduct[]>>(ENDPOINTS.PRODUCT);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
        }
    },
    getProduct: async (id: string | number) => {
        try {
            const response = await axiosInstance.get<ApiResponse<TableProduct>>(`${ENDPOINTS.PRODUCT}/${id}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
        }
    },
    createProduct: async (data: FormData) => {
        try {
            const response = await axiosInstance.post<ApiResponse<null>>(ENDPOINTS.PRODUCT, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
        }
    },
    editProduct: async (id: string | number, data: FormData) => {
        try {
            const response = await axiosInstance.put<ApiResponse<null>>(`${ENDPOINTS.PRODUCT}/${id}`, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
        }
    },
    deleteProduct: async (id: string | number) => {
        try {
            const response = await axiosInstance.delete<ApiResponse<null>>(`${ENDPOINTS.PRODUCT}/${id}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
        }
    },
};
