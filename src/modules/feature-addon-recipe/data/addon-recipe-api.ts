import { ENDPOINTS, type ApiResponse } from "@/lib/api";
import axiosInstance from "@/lib/api/axios";
import { isAxiosError } from "axios";
import type { AddonRecipe } from "../domain/addon-recipe";
import type { BulkCreateAddonRecipeDTOType } from "./addon-recipe-dto";

export const addonRecipeApi = {
    getAddonRecipes: async () => {
        try {
            const response = await axiosInstance.get<ApiResponse<AddonRecipe[]>>(ENDPOINTS.ADDON_RECIPE);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },

    getAddonRecipeByAddonId: async (addonId: string | number) => {
        try {
            const response = await axiosInstance.get<ApiResponse<AddonRecipe>>(`${ENDPOINTS.ADDON_RECIPE}/${addonId}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },

    createAddonRecipe: async (data: BulkCreateAddonRecipeDTOType) => {
        try {
            const response = await axiosInstance.post<ApiResponse<null>>(`${ENDPOINTS.ADDON_RECIPE}/bulk`, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },

    deleteAddonRecipesByAddonId: async (addonId: string | number) => {
        try {
            const response = await axiosInstance.delete<ApiResponse<null>>(`${ENDPOINTS.ADDON_RECIPE}/${addonId}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },

    updateAddonRecipe: async (id: string | number, data: BulkCreateAddonRecipeDTOType) => {
        try {
            const response = await axiosInstance.put<ApiResponse<null>>(`${ENDPOINTS.ADDON_RECIPE}/${id}/bulk`, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },
};
