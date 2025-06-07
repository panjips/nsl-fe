import { create } from "zustand";
import type { ReservationState } from "./state";
import { errorState, initialState, loadingState, successState } from "@/stores/core";
import { reservationApi } from "../data";
import type { ReservationWithOrderCateringAndPackage } from "../domain";

export const useReservationStore = create<ReservationState>((set) => ({
    reservations: {
        state: initialState(),
        getAllReservations: async () => {
            set((state) => ({
                reservations: {
                    ...state.reservations,
                    state: loadingState(),
                },
            }));
            try {
                const reservations = await reservationApi.getReservations();
                if (!reservations?.data) {
                    throw new Error("Reservations response data is missing");
                }
                set((state) => ({
                    reservations: {
                        ...state.reservations,
                        state: successState(reservations?.data || []),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    reservations: {
                        ...state.reservations,
                        state: errorState(error instanceof Error ? error.message : "Failed to fetch reservations"),
                    },
                }));
            }
        },
    },

    reservation: {
        state: initialState(),
        getReservation: async (id: string | number) => {
            set((state) => ({
                reservation: {
                    ...state.reservation,
                    state: loadingState(),
                },
            }));
            try {
                const reservation = await reservationApi.getReservation(id);
                if (!reservation?.data) {
                    throw new Error("Reservation response data is missing");
                }
                set((state) => ({
                    reservation: {
                        ...state.reservation,
                        state: successState(reservation?.data as ReservationWithOrderCateringAndPackage),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    reservation: {
                        ...state.reservation,
                        state: errorState(error instanceof Error ? error.message : "Failed to fetch reservation"),
                    },
                }));
            }
        },
    },

    userReservations: {
        state: initialState(),
        getReservationByUserId: async (userId: string | number) => {
            set((state) => ({
                userReservations: {
                    ...state.userReservations,
                    state: loadingState(),
                },
            }));
            try {
                const reservations = await reservationApi.getReservationByUserId(userId);
                if (!reservations?.data) {
                    throw new Error("User reservations response data is missing");
                }
                set((state) => ({
                    userReservations: {
                        ...state.userReservations,
                        state: successState(reservations?.data || []),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    userReservations: {
                        ...state.userReservations,
                        state: errorState(error instanceof Error ? error.message : "Failed to fetch user reservations"),
                    },
                }));
            }
        },
    },

    updateReservation: {
        state: initialState(),
        updateReservation: async (id: string | number, data) => {
            set((state) => ({
                updateReservation: {
                    ...state.updateReservation,
                    state: loadingState(),
                },
            }));
            try {
                const response = await reservationApi.updateReservation(id, data);
                if (!response) {
                    throw new Error("Update reservation response is missing");
                }
                set((state) => ({
                    updateReservation: {
                        ...state.updateReservation,
                        state: successState(response),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    updateReservation: {
                        ...state.updateReservation,
                        state: errorState(error instanceof Error ? error.message : "Failed to update reservation"),
                    },
                }));
            }
        },
    },

    updateReservationStatus: {
        state: initialState(),
        updateReservationStatus: async (id: string | number, data: { status: string }) => {
            set((state) => ({
                updateReservationStatus: {
                    ...state.updateReservationStatus,
                    state: loadingState(),
                },
            }));
            try {
                const response = await reservationApi.updateReservationStatus(id, data);
                if (!response) {
                    throw new Error("Update reservation status response is missing");
                }
                set((state) => ({
                    updateReservationStatus: {
                        ...state.updateReservationStatus,
                        state: successState(response),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    updateReservationStatus: {
                        ...state.updateReservationStatus,
                        state: errorState(
                            error instanceof Error ? error.message : "Failed to update reservation status",
                        ),
                    },
                }));
            }
        },
    },

    createReservation: {
        state: initialState(),
        createReservation: async (data) => {
            set((state) => ({
                createReservation: {
                    ...state.createReservation,
                    state: loadingState(),
                },
            }));
            try {
                const response = await reservationApi.createReservation(data);
                if (!response) {
                    throw new Error("Create reservation response is missing");
                }
                set((state) => ({
                    createReservation: {
                        ...state.createReservation,
                        state: successState(response),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    createReservation: {
                        ...state.createReservation,
                        state: errorState(error instanceof Error ? error.message : "Failed to create reservation"),
                    },
                }));
            }
        },
    },

    deleteReservation: {
        state: initialState(),
        deleteReservation: async (id: string | number) => {
            set((state) => ({
                deleteReservation: {
                    ...state.deleteReservation,
                    state: loadingState(),
                },
            }));
            try {
                const response = await reservationApi.deleteReservation(id);
                if (!response) {
                    throw new Error("Delete reservation response is missing");
                }
                set((state) => ({
                    deleteReservation: {
                        ...state.deleteReservation,
                        state: successState(response),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    deleteReservation: {
                        ...state.deleteReservation,
                        state: errorState(error instanceof Error ? error.message : "Failed to delete reservation"),
                    },
                }));
            }
        },
    },

    modal: {
        isOpen: false,
        mode: null,
        data: null,
        id: null,
        onOpen: (mode, data, id) => {
            set((state) => ({
                modal: {
                    ...state.modal,
                    isOpen: true,
                    mode,
                    id: id ?? null,
                    data: data ?? null,
                },
            }));
        },
        onClose: () => {
            set((state) => ({
                modal: {
                    ...state.modal,
                    isOpen: false,
                    mode: null,
                    data: null,
                },
            }));
        },
    },

    resetModal: () => {
        set((state) => ({
            modal: {
                ...state.modal,
                isOpen: false,
                mode: null,
                data: null,
                id: null,
            },
        }));
    },

    resetReservationsState: () => {
        set((state) => ({
            reservations: {
                ...state.reservations,
                state: initialState(),
            },
        }));
    },

    resetReservationState: () => {
        set((state) => ({
            reservation: {
                ...state.reservation,
                state: initialState(),
            },
        }));
    },

    resetUserReservationsState: () => {
        set((state) => ({
            userReservations: {
                ...state.userReservations,
                state: initialState(),
            },
        }));
    },

    resetUpdateReservationState: () => {
        set((state) => ({
            updateReservation: {
                ...state.updateReservation,
                state: initialState(),
            },
        }));
    },

    resetUpdateReservationStatusState: () => {
        set((state) => ({
            updateReservationStatus: {
                ...state.updateReservationStatus,
                state: initialState(),
            },
        }));
    },

    resetCreateReservationState: () => {
        set((state) => ({
            createReservation: {
                ...state.createReservation,
                state: initialState(),
            },
        }));
    },

    resetDeleteReservationState: () => {
        set((state) => ({
            deleteReservation: {
                ...state.deleteReservation,
                state: initialState(),
            },
        }));
    },
}));
