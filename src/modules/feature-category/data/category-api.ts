import { ENDPOINTS, type ApiResponse } from "@/lib/api";
import axiosInstance from "@/lib/api/axios";
import { isAxiosError } from "axios";
import type { Category } from "../domain/category";
import type {
  CreateCategoryDTOType,
  UpdateCategoryDTOType,
} from "./category-dto";

export const categoryApi = {
  categories: async () => {
    try {
      const response = await axiosInstance.get<ApiResponse<Category[]>>(
        ENDPOINTS.CATEGORY
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
    }
  },
  editCategory: async (id: string | number, data: UpdateCategoryDTOType) => {
    try {
      const response = await axiosInstance.put<ApiResponse<Category>>(
        `${ENDPOINTS.CATEGORY}/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
    }
  },
  createCategory: async (data: CreateCategoryDTOType) => {
    try {
      const response = await axiosInstance.post<ApiResponse<Category>>(
        ENDPOINTS.CATEGORY,
        data
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
    }
  },
  deleteCategory: async (id: string | number) => {
    try {
      const response = await axiosInstance.delete<ApiResponse<null>>(
        `${ENDPOINTS.CATEGORY}/${id}`
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
    }
  },
};
