import type { ViewState } from "@/stores/core";
import type { ReservationWithOrderCateringAndPackage } from "../domain/reservation";
import type { CreateReservationDTOType, UpdateReservationDTOType } from "../data";
import type { ApiResponse } from "@/lib/api";

export interface ReservationState {
    reservations: {
        state: ViewState<ReservationWithOrderCateringAndPackage[], string>;
        getAllReservations: () => Promise<void>;
    };

    reservation: {
        state: ViewState<ReservationWithOrderCateringAndPackage, string>;
        getReservation: (id: string | number) => Promise<void>;
    };

    userReservations: {
        state: ViewState<ReservationWithOrderCateringAndPackage[], string>;
        getReservationByUserId: (userId: string | number) => Promise<void>;
    };

    updateReservation: {
        state: ViewState<ApiResponse<null>, string>;
        updateReservation: (id: string | number, data: UpdateReservationDTOType) => Promise<void>;
    };

    updateReservationStatus: {
        state: ViewState<ApiResponse<null>, string>;
        updateReservationStatus: (id: string | number, data: { status: string }) => Promise<void>;
    };

    createReservation: {
        state: ViewState<ApiResponse<null>, string>;
        createReservation: (data: CreateReservationDTOType) => Promise<void>;
    };

    deleteReservation: {
        state: ViewState<ApiResponse<null>, string>;
        deleteReservation: (id: string | number) => Promise<void>;
    };

    modal: {
        isOpen: boolean;
        mode: "create" | "edit" | "delete" | "view" | "status" | null;
        data?: ReservationWithOrderCateringAndPackage | null;
        id?: string | number | null;
        onOpen: (
            mode: "create" | "edit" | "delete" | "view" | "status",
            data?: ReservationWithOrderCateringAndPackage | null,
            id?: string | number,
        ) => void;
        onClose: () => void;
    };

    resetModal: () => void;
    resetReservationsState: () => void;
    resetReservationState: () => void;
    resetUserReservationsState: () => void;
    resetUpdateReservationState: () => void;
    resetUpdateReservationStatusState: () => void;
    resetCreateReservationState: () => void;
    resetDeleteReservationState: () => void;
}
