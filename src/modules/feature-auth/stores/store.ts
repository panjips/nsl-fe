import { create } from "zustand";
import type { AuthState } from "./state";
import { errorState, initialState, loadingState, successState } from "@/stores/core";
import {
    authApi,
    type ForgotPasswordReqDTOType,
    type LoginReqDTOType,
    type RegisterReqDTOType,
    type ResetPasswordReqDTOType,
} from "../data";
import Cookies from "js-cookie";

export const useAuthStore = create<AuthState>((set) => ({
    loginState: initialState(),
    registerState: initialState(),
    forgotPasswordState: initialState(),
    resetPasswordState: initialState(),
    login: async (data: LoginReqDTOType) => {
        set({ loginState: loadingState() });
        try {
            const user = await authApi.login(data);
            if (!user?.data) {
                throw new Error("Login response data is missing");
            }
            set({
                loginState: successState(user),
            });
            Cookies.set("token", user.data.token);
        } catch (error) {
            set({
                loginState: errorState(error instanceof Error ? error.message : "Login failed"),
            });
            throw error;
        }
    },
    register: async (data: RegisterReqDTOType) => {
        set({ registerState: loadingState() });
        try {
            const user = await authApi.register(data);
            set({
                registerState: successState(user),
            });
        } catch (error) {
            set({
                registerState: errorState(error instanceof Error ? error.message : "Register failed"),
            });
        }
    },
    forgotPassword: async (data: ForgotPasswordReqDTOType) => {
        set({ forgotPasswordState: loadingState() });
        try {
            const forget = await authApi.forgotPassword(data);
            set({
                forgotPasswordState: successState(forget),
            });
        } catch (error) {
            set({
                forgotPasswordState: errorState(error instanceof Error ? error.message : "Forgot password failed"),
            });
        }
    },
    resetPassword: async (data: ResetPasswordReqDTOType, token: string) => {
        set({ resetPasswordState: loadingState() });
        try {
            const reset = await authApi.resetPassword({ ...data, token });
            set({
                resetPasswordState: successState(reset),
            });
        } catch (error) {
            set({
                resetPasswordState: errorState(error instanceof Error ? error.message : "Reset password failed"),
            });
        }
    },
    resetLoginState: () => set({ loginState: initialState() }),
    resetRegisterState: () => set({ registerState: initialState() }),
    resetForgotPasswordState: () => set({ forgotPasswordState: initialState() }),
    resetResetPasswordState: () => set({ resetPasswordState: initialState() }),
}));
