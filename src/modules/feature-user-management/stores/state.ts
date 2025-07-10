import type { ViewState } from "@/stores";
import type { UserWithRole } from "../domain";
import type { ApiResponse } from "@/lib/api";
import type { CreateCategoryDTOType } from "@/modules/feature-category";
import type { UpdateUserDTOType } from "../data";

export interface UserState {
    users: {
        state: ViewState<UserWithRole[], string>;
        getUsers: (type?: string) => Promise<void>;
    };
    createUser: {
        state: ViewState<ApiResponse<any>, string>;
        createUser: (data: CreateCategoryDTOType) => Promise<void>;
    };
    getUser: {
        state: ViewState<ApiResponse<UserWithRole>, string>;
        getUser: (id: string | number) => Promise<void>;
    };
    updateUser: {
        state: ViewState<ApiResponse<any>, string>;
        updateUser: (id: string | number, data: UpdateUserDTOType) => Promise<void>;
    };
    selfUpdate: {
        state: ViewState<ApiResponse<any>, string>;
        selfUpdate: (data: UpdateUserDTOType) => Promise<void>;
    };
    deleteUser: {
        state: ViewState<ApiResponse<null>, string>;
        deleteUser: (id: string | number) => Promise<void>;
    };
    resetPasswordProfile: {
        state: ViewState<ApiResponse<any>, string>;
        resetPasswordProfile: (data: { newPassword: string; newPasswordConfirm: string }) => Promise<void>;
    };
    modal: {
        isOpen: boolean;
        mode: "delete" | null;
        id: string | number | null;
        onOpen: (mode: "delete", id: string | number) => void;
        onClose: () => void;
    };

    resetModal: () => void;
    resetUsers: () => void;
    resetCreateUser: () => void;
    resetGetUser: () => void;
    resetUpdateUser: () => void;
    resetDeleteUser: () => void;
    resetResetPasswordProfile: () => void;
    resetSelfUpdate: () => void;
}
