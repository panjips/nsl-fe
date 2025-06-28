import { useEffect } from "react";
import { useUserStore } from "../stores";
import { toast } from "sonner";
import { useLocation, useNavigate } from "@tanstack/react-router";
import type { CreateUserDTOType } from "../data";

export const useCreateUser = () => {
    const { createUser, resetCreateUser } = useUserStore();
    const navigate = useNavigate();
    const location = useLocation();

    const handleCreateUser = async (data: CreateUserDTOType): Promise<void> => {
        if (data) {
            await createUser.createUser(data);
        }
    };

    useEffect(() => {
        if (createUser.state.state === "success") {
            toast.error(createUser.state.data.message || "Create user successfully");
            navigate({ to: `/dashboard/user/${location.search.type}` });
        }

        if (createUser.state.state === "error") {
            toast.error(createUser.state.error || "Failed to create user");
        }

        return () => {
            resetCreateUser();
        };
    }, [createUser.state.state, resetCreateUser]);

    const isLoading = createUser.state.state === "loading";

    return {
        handleCreateUser,
        isLoading,
    };
};
