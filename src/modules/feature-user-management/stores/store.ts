import { create } from "zustand";
import type { UserState } from "./state";
import { errorState, initialState, loadingState, successState } from "@/stores/core";
import { userApi, type UpdateUserDTOType } from "../data";
import type { UserWithRole } from "../domain";
import type { CreateCategoryDTOType } from "@/modules/feature-category";

export const useUserStore = create<UserState>((set) => ({
    users: {
        state: initialState(),
        getUsers: async (type?: string) => {
            set((state) => ({
                users: {
                    ...state.users,
                    state: loadingState(),
                },
            }));
            try {
                const users = await userApi.users(type);
                if (!users) {
                    throw new Error("Users response data is missing");
                }
                set((state) => ({
                    users: {
                        ...state.users,
                        state: successState(users.data as UserWithRole[]),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    users: {
                        ...state.users,
                        state: errorState(error instanceof Error ? error.message : "Failed to fetch users"),
                    },
                }));
            }
        },
    },
    createUser: {
        state: initialState(),
        createUser: async (data: CreateCategoryDTOType) => {
            set((state) => ({
                createUser: {
                    ...state.createUser,
                    state: loadingState(),
                },
            }));
            try {
                const response = await userApi.createUser(data);
                if (!response) {
                    throw new Error("Create user response data is missing");
                }
                set((state) => ({
                    createUser: {
                        ...state.createUser,
                        state: successState(response),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    createUser: {
                        ...state.createUser,
                        state: errorState(error instanceof Error ? error.message : "Failed to create user"),
                    },
                }));
            }
        },
    },
    getUser: {
        state: initialState(),
        getUser: async (id: string | number) => {
            set((state) => ({
                getUser: {
                    ...state.getUser,
                    state: loadingState(),
                },
            }));
            try {
                const response = await userApi.getUser(id);
                if (!response) {
                    throw new Error("Get user response data is missing");
                }
                set((state) => ({
                    getUser: {
                        ...state.getUser,
                        state: successState(response),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    getUser: {
                        ...state.getUser,
                        state: errorState(error instanceof Error ? error.message : "Failed to get user"),
                    },
                }));
            }
        },
    },
    updateUser: {
        state: initialState(),
        updateUser: async (id: string | number, data: UpdateUserDTOType) => {
            set((state) => ({
                updateUser: {
                    ...state.updateUser,
                    state: loadingState(),
                },
            }));
            try {
                const response = await userApi.updateUser(id, data);
                if (!response) {
                    throw new Error("Update user response data is missing");
                }
                set((state) => ({
                    updateUser: {
                        ...state.updateUser,
                        state: successState(response),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    updateUser: {
                        ...state.updateUser,
                        state: errorState(error instanceof Error ? error.message : "Failed to update user"),
                    },
                }));
            }
        },
    },

    selfUpdate: {
        state: initialState(),
        selfUpdate: async (data: UpdateUserDTOType) => {
            set((state) => ({
                selfUpdate: {
                    ...state.selfUpdate,
                    state: loadingState(),
                },
            }));
            try {
                const response = await userApi.selfUpdate(data);
                if (!response) {
                    throw new Error("Self update response data is missing");
                }
                set((state) => ({
                    selfUpdate: {
                        ...state.selfUpdate,
                        state: successState(response),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    selfUpdate: {
                        ...state.selfUpdate,
                        state: errorState(error instanceof Error ? error.message : "Failed to update profile"),
                    },
                }));
            }
        },
    },

    deleteUser: {
        state: initialState(),
        deleteUser: async (id: string | number) => {
            set((state) => ({
                deleteUser: {
                    ...state.deleteUser,
                    state: loadingState(),
                },
            }));
            try {
                const response = await userApi.deleteUser(id);
                if (!response) {
                    throw new Error("Delete user response data is missing");
                }
                set((state) => ({
                    deleteUser: {
                        ...state.deleteUser,
                        state: successState(response),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    deleteUser: {
                        ...state.deleteUser,
                        state: errorState(error instanceof Error ? error.message : "Failed to delete user"),
                    },
                }));
            }
        },
    },

    resetPasswordProfile: {
        state: initialState(),
        resetPasswordProfile: async (data: {
            newPassword: string;
            newPasswordConfirm: string;
        }) => {
            set((state) => ({
                resetPasswordProfile: {
                    ...state.resetPasswordProfile,
                    state: loadingState(),
                },
            }));
            try {
                const response = await userApi.resetPasswordProfile(data);
                if (!response) {
                    throw new Error("Reset password response data is missing");
                }
                set((state) => ({
                    resetPasswordProfile: {
                        ...state.resetPasswordProfile,
                        state: successState(response),
                    },
                }));
            } catch (error) {
                set((state) => ({
                    resetPasswordProfile: {
                        ...state.resetPasswordProfile,
                        state: errorState(error instanceof Error ? error.message : "Failed to reset password"),
                    },
                }));
            }
        },
    },

    modal: {
        isOpen: false,
        mode: null,
        id: null,
        onOpen: (mode, id) => {
            set((state) => ({
                modal: {
                    ...state.modal,
                    isOpen: true,
                    mode,
                    id,
                },
            }));
        },
        onClose: () => {
            set((state) => ({
                modal: {
                    ...state.modal,
                    isOpen: false,
                    mode: null,
                    id: null,
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
                id: null,
            },
        }));
    },

    resetUsers: () => {
        set((state) => ({
            users: {
                ...state.users,
                state: initialState(),
            },
        }));
    },
    resetCreateUser: () => {
        set((state) => ({
            createUser: {
                ...state.createUser,
                state: initialState(),
            },
        }));
    },
    resetGetUser: () => {
        set((state) => ({
            getUser: {
                ...state.getUser,
                state: initialState(),
            },
        }));
    },
    resetUpdateUser: () => {
        set((state) => ({
            updateUser: {
                ...state.updateUser,
                state: initialState(),
            },
        }));
    },
    resetDeleteUser: () => {
        set((state) => ({
            deleteUser: {
                ...state.deleteUser,
                state: initialState(),
            },
        }));
    },
    resetResetPasswordProfile: () => {
        set((state) => ({
            resetPasswordProfile: {
                ...state.resetPasswordProfile,
                state: initialState(),
            },
        }));
    },
    resetSelfUpdate: () => {
        set((state) => ({
            selfUpdate: {
                ...state.selfUpdate,
                state: initialState(),
            },
        }));
    },
}));
