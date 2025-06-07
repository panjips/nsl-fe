import { ENDPOINTS, type ApiResponse } from "@/lib/api";
import axiosInstance from "@/lib/api/axios";
import { isAxiosError } from "axios";
import type { Purchase, PurchaseWithInventory } from "../domain/purhcase";
import type { CreatePurchaseDTOType, UpdatePurchaseDTOType } from "./purchase-dto";

export const purchaseApi = {
    getPurchases: async () => {
        try {
            const url = ENDPOINTS.PURCHASE;

            const response = await axiosInstance.get<ApiResponse<PurchaseWithInventory[]>>(url);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },

    getPurchase: async (id: string | number) => {
        try {
            const url = `${ENDPOINTS.PURCHASE}/${id}`;

            const response = await axiosInstance.get<ApiResponse<PurchaseWithInventory>>(url);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },

    createPurchase: async (data: CreatePurchaseDTOType) => {
        try {
            const response = await axiosInstance.post<ApiResponse<null>>(ENDPOINTS.PURCHASE, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },

    updatePurchase: async (id: string | number, data: UpdatePurchaseDTOType) => {
        try {
            const response = await axiosInstance.put<ApiResponse<null>>(`${ENDPOINTS.PURCHASE}/${id}`, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },

    deletePurchase: async (id: string | number) => {
        try {
            const response = await axiosInstance.delete<ApiResponse<null>>(`${ENDPOINTS.PURCHASE}/${id}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },

    togglePurchaseStatus: async (id: string | number, isActive: boolean) => {
        try {
            const response = await axiosInstance.patch<ApiResponse<Purchase>>(`${ENDPOINTS.PURCHASE}/${id}/status`, {
                is_active: isActive,
            });
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },
};
