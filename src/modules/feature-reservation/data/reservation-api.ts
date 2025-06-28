import { ENDPOINTS, type ApiResponse } from "@/lib/api";
import axiosInstance from "@/lib/api/axios";
import { isAxiosError } from "axios";
import type { ReservationWithOrderCateringAndPackage } from "../domain/reservation";
import type { CreateReservationDTOType, UpdateReservationDTOType } from "./reservation-dto";

export const reservationApi = {
    getReservations: async (params?: string) => {
        try {
            const response = await axiosInstance.get<ApiResponse<ReservationWithOrderCateringAndPackage[]>>(
                ENDPOINTS.RESERVATION,
                {
                    params: {
                        status: params ? params : undefined,
                    },
                },
            );
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },

    getReservation: async (id: string | number) => {
        try {
            const response = await axiosInstance.get<ApiResponse<ReservationWithOrderCateringAndPackage>>(
                `${ENDPOINTS.RESERVATION}/${id}`,
            );
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },

    getReservationByUserId: async (id: string | number) => {
        try {
            const response = await axiosInstance.get<ApiResponse<ReservationWithOrderCateringAndPackage[]>>(
                `${ENDPOINTS.RESERVATION}/user/${id}`,
            );
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },

    updateReservation: async (id: string | number, data: UpdateReservationDTOType) => {
        try {
            const response = await axiosInstance.put<ApiResponse<null>>(`${ENDPOINTS.RESERVATION}/${id}`, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },

    updateReservationStatus: async (id: string | number, data: { status: string }) => {
        try {
            const response = await axiosInstance.put<ApiResponse<null>>(`${ENDPOINTS.RESERVATION}/status/${id}`, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },

    createReservation: async (data: CreateReservationDTOType) => {
        try {
            const response = await axiosInstance.post<ApiResponse<null>>(ENDPOINTS.RESERVATION, data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },

    deleteReservation: async (id: string | number) => {
        try {
            const response = await axiosInstance.delete<ApiResponse<null>>(`${ENDPOINTS.RESERVATION}/${id}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message);
            }
            throw error;
        }
    },
};
