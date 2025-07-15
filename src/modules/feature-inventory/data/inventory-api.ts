import { ENDPOINTS, type ApiResponse } from "@/lib/api";
import axiosInstance from "@/lib/api/axios";
import { isAxiosError } from "axios";
import type { Inventory, InventoryOpname } from "../domain/inventory";
import type { CreateInventoryDTOType, CreateInventoryOpnameDTOType, UpdateInventoryDTOType } from "./inventory-dto";

export const inventoryApi = {
    getInventories: async () => {
        try {
            const response = await axiosInstance.get<ApiResponse<Inventory[]>>(ENDPOINTS.INVENTORY);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },
    getInventoryOpnames: async () => {
        try {
            const response = await axiosInstance.get<ApiResponse<InventoryOpname[]>>(`${ENDPOINTS.INVENTORY}/opname`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },
    getInventory: async (id: string | number) => {
        try {
            const response = await axiosInstance.get<ApiResponse<Inventory>>(`${ENDPOINTS.INVENTORY}/${id}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },
    createInventory: async (data: CreateInventoryDTOType) => {
        try {
            const response = await axiosInstance.post<ApiResponse<null>>(ENDPOINTS.INVENTORY, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },
    createInventoryOpname: async (data: CreateInventoryOpnameDTOType) => {
        try {
            const response = await axiosInstance.post<ApiResponse<null>>(`${ENDPOINTS.INVENTORY}/opname`, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },
    updateInventory: async (id: string | number, data: UpdateInventoryDTOType) => {
        try {
            const response = await axiosInstance.put<ApiResponse<null>>(`${ENDPOINTS.INVENTORY}/${id}`, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },
    deleteInventory: async (id: string | number) => {
        try {
            const response = await axiosInstance.delete<ApiResponse<null>>(`${ENDPOINTS.INVENTORY}/${id}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },
};
