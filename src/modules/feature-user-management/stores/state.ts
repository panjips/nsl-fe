import type { ViewState } from "@/stores";
import type { UserWithRole } from "../domain";
import type { ApiResponse } from "@/lib/api";
import type { CreateCategoryDTOType } from "@/modules/feature-category";

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
    updateUser: (id: string | number, data: CreateCategoryDTOType) => Promise<void>;
  };
  deleteUser: {
    state: ViewState<ApiResponse<null>, string>;
    deleteUser: (id: string | number) => Promise<void>;
  };

  resetUsers: () => void;
  resetCreateUser: () => void;
  resetGetUser: () => void;
  resetUpdateUser: () => void;
  resetDeleteUser: () => void;
}
