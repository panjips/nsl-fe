import { ENDPOINTS, type ApiResponse } from "@/lib/api";
import axiosInstance from "@/lib/api/axios";
import { isAxiosError } from "axios";
import type { ProductRecipe, SugarType } from "../domain";
import type { BulkCreateProductRecipeDTOType } from "@/modules/feature-product-recipe/data";

export const productRecipeApi = {
    getProductRecipes: async () => {
        try {
            const response = await axiosInstance.get<ApiResponse<ProductRecipe[]>>(ENDPOINTS.PRODUCT_RECIPE);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },

    getProductRecipeByProductId: async (
        productId: string | number,
        params?: {
            type?: SugarType;
        },
    ) => {
        try {
            const response = await axiosInstance.get<ApiResponse<ProductRecipe>>(
                `${ENDPOINTS.PRODUCT_RECIPE}/${productId}`,
                params ? { params } : {},
            );
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },

    createProductRecipe: async (data: BulkCreateProductRecipeDTOType) => {
        try {
            const response = await axiosInstance.post<ApiResponse<null>>(`${ENDPOINTS.PRODUCT_RECIPE}/bulk`, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },

    deleteProductRecipesByProductId: async (productId: string | number) => {
        try {
            const response = await axiosInstance.delete<ApiResponse<null>>(
                `${ENDPOINTS.PRODUCT_RECIPE}/product/${productId}`,
            );
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },

    updateProductRecipe: async (id: string | number, data: BulkCreateProductRecipeDTOType) => {
        try {
            const response = await axiosInstance.put<ApiResponse<null>>(`${ENDPOINTS.PRODUCT_RECIPE}/${id}/bulk`, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },
};
