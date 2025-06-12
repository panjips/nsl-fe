import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type AuthState, initialAuthState } from "./state";
import { type UserLogin, authApi } from "@/modules/feature-auth";
import Cookies from "js-cookie";

interface AuthStore extends AuthState {
    login: (user: UserLogin, token: string) => void;
    logout: () => void;
    setAuthLoading: (isLoading: boolean) => void;
    setAuthError: (error: string | null) => void;
    updateUser: (user: Partial<UserLogin>) => void;
    clearAuthError: () => void;
}

export const useGlobalAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            ...initialAuthState,

            login: (user: UserLogin, token: string) =>
                set({ user, token, isAuthenticated: true, error: null, isLoading: false }),

            logout: async () => {
                try {
                    await authApi.logout();
                    set({ ...initialAuthState });
                    localStorage.removeItem("nsl-auth-storage");
                    Cookies.remove("token");
                } catch (error) {
                    console.error("Logout failed:", error);
                }
            },

            setAuthLoading: (isLoading: boolean) => set({ isLoading }),

            setAuthError: (error: string | null) => set({ error, isLoading: false }),

            clearAuthError: () => set({ error: null }),

            updateUser: (userData: Partial<UserLogin>) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...userData } : null,
                })),
        }),
        {
            name: "nsl-auth-storage",
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        },
    ),
);
