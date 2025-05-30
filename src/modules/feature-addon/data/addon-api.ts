import { ENDPOINTS, type ApiResponse } from "@/lib/api";
import axiosInstance from "@/lib/api/axios";
import { isAxiosError } from "axios";
import type { Addon } from "../domain/addon";
import type {
  CreateAddonDTOType,
  UpdateAddonDTOType,
} from "./addon-dto";

export const addonApi = {
  getAddons: async () => {
    try {
      const response = await axiosInstance.get<ApiResponse<Addon[]>>(
        ENDPOINTS.ADDON
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw error;
    }
  },
  
  getAddon: async (id: string | number) => {
    try {
      const response = await axiosInstance.get<ApiResponse<Addon>>(
        `${ENDPOINTS.ADDON}/${id}`
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw error;
    }
  },
  
  updateAddon: async (id: string | number, data: UpdateAddonDTOType) => {
    try {
      const response = await axiosInstance.put<ApiResponse<null>>(
        `${ENDPOINTS.ADDON}/${id}`,
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
  
  createAddon: async (data: CreateAddonDTOType) => {
    try {
      const response = await axiosInstance.post<ApiResponse<null>>(
        ENDPOINTS.ADDON,
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
  
  deleteAddon: async (id: string | number) => {
    try {
      const response = await axiosInstance.delete<ApiResponse<null>>(
        `${ENDPOINTS.ADDON}/${id}`
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