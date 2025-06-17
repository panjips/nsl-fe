import axiosInstance from "@/lib/api/axios";
import type {
    ForgotPasswordReqDTOType,
    LoginReqDTOType,
    RegisterReqDTOType,
    ResetPasswordReqDTOType,
} from "./auth-dto";
import { ENDPOINTS, type ApiResponse } from "@/lib/api";
import { isAxiosError } from "axios";
import type { UserLoginResponse } from "../domain/user";

export const authApi = {
    register: async (data: RegisterReqDTOType) => {
        try {
            const response = await axiosInstance.post<ApiResponse<null>>(ENDPOINTS.REGISTER, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
        }
    },
    login: async (data: LoginReqDTOType) => {
        try {
            const response = await axiosInstance.post<ApiResponse<UserLoginResponse>>(ENDPOINTS.LOGIN, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
        }
    },
    forgotPassword: async (data: ForgotPasswordReqDTOType) => {
        try {
            const response = await axiosInstance.post<ApiResponse<null>>(ENDPOINTS.FORGOT_PASSWORD, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
        }
    },
    resetPassword: async (data: ResetPasswordReqDTOType & { token: string }) => {
        try {
            const response = await axiosInstance.post<ApiResponse<null>>(`${ENDPOINTS.RESET_PASSWORD}`, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
        }
    },
    logout: async () => {
        try {
            const response = await axiosInstance.post<ApiResponse<null>>(ENDPOINTS.LOGOUT);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
        }
    },
};
