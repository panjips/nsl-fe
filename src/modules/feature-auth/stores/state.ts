import type { ViewState } from "@/stores/core";
import type { RegisterReqDTOType, LoginReqDTOType, ForgotPasswordReqDTOType, ResetPasswordReqDTOType } from "../data";
import type { UserLoginResponse } from "../domain/user";
import { type ApiResponse } from "@/lib/api";

export interface AuthState {
    loginState: ViewState<ApiResponse<UserLoginResponse>, string>;
    registerState: ViewState<any, string>;
    forgotPasswordState: ViewState<any, string>;
    resetPasswordState: ViewState<any, string>;
    register: (data: RegisterReqDTOType) => Promise<void>;
    login: (data: LoginReqDTOType) => Promise<void>;
    forgotPassword: (data: ForgotPasswordReqDTOType) => Promise<void>;
    resetPassword: (data: ResetPasswordReqDTOType, token: string) => Promise<void>;
    resetLoginState: () => void;
    resetRegisterState: () => void;
    resetForgotPasswordState: () => void;
    resetResetPasswordState: () => void;
}
