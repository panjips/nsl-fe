import { ENDPOINTS, type ApiResponse } from "@/lib/api";
import axiosInstance from "@/lib/api/axios";
import { isAxiosError } from "axios";
import type { CateringPackage } from "../domain";
import type {
  CreateCateringPackageDTOType,
  UpdateCateringPackageDTOType,
} from "./catering-package-dto";

export const cateringPackageApi = {
  getCateringPackages: async () => {
    try {
      const response = await axiosInstance.get<ApiResponse<CateringPackage[]>>(
        ENDPOINTS.CATERING_PACKAGE
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw error;
    }
  },
  getCateringPackage: async (id: string | number) => {
    try {
      const response = await axiosInstance.get<ApiResponse<CateringPackage>>(
        `${ENDPOINTS.CATERING_PACKAGE}/${id}`
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw error;
    }
  },
  createCateringPackage: async (data: CreateCateringPackageDTOType) => {
    try {
      const response = await axiosInstance.post<ApiResponse<null>>(
        ENDPOINTS.CATERING_PACKAGE,
        data
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw error;
    }
  },
  updateCateringPackage: async (
    id: string | number,
    data: UpdateCateringPackageDTOType
  ) => {
    try {
      const response = await axiosInstance.put<ApiResponse<null>>(
        `${ENDPOINTS.CATERING_PACKAGE}/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw error;
    }
  },
  deleteCateringPackage: async (id: string | number) => {
    try {
      const response = await axiosInstance.delete<ApiResponse<null>>(
        `${ENDPOINTS.CATERING_PACKAGE}/${id}`
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw error;
    }
  },
};
