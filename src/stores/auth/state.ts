import type { UserLogin } from "@/modules/feature-auth";

export interface AuthState {
    user: UserLogin | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export const initialAuthState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};
