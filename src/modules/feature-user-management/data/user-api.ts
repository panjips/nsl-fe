import { ENDPOINTS, type ApiResponse } from "@/lib/api";
import axiosInstance from "@/lib/api/axios";
import { isAxiosError } from "axios";
import type { UserWithRole } from "../domain/user";
import type { CreateCategoryDTOType } from "@/modules/feature-category";
import type { UpdateUserDTOType } from "./user-dto";

export const userApi = {
    users: async (type?: string) => {
        try {
            const response = await axiosInstance.get<ApiResponse<UserWithRole[]>>(ENDPOINTS.USER, {
                params: {
                    type: type,
                },
            });
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
        }
    },
    getUser: async (id: string | number) => {
        try {
            const response = await axiosInstance.get<ApiResponse<UserWithRole>>(`${ENDPOINTS.USER}/${id}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
        }
    },
    createUser: async (data: CreateCategoryDTOType) => {
        try {
            const response = await axiosInstance.post<ApiResponse<UserWithRole>>(ENDPOINTS.USER, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
        }
    },
    updateUser: async (id: string | number, data: UpdateUserDTOType) => {
        try {
            const response = await axiosInstance.put<ApiResponse<UserWithRole>>(`${ENDPOINTS.USER}/${id}`, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
        }
    },
    selfUpdate: async (data: UpdateUserDTOType) => {
        try {
            const response = await axiosInstance.put<ApiResponse<UserWithRole>>(`${ENDPOINTS.USER}/self`, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
        }
    },
    deleteUser: async (id: string | number) => {
        try {
            const response = await axiosInstance.delete<ApiResponse<null>>(`${ENDPOINTS.USER}/${id}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
        }
    },
    resetPasswordProfile: async (data: { newPassword: string; newPasswordConfirm: string }) => {
        try {
            const response = await axiosInstance.post<ApiResponse<null>>(ENDPOINTS.RESET_PASSWORD_PROFILE, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
        }
    },
};
