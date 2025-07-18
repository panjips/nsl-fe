import { useEffect } from "react";
import { useUserStore } from "../stores";
import { toast } from "sonner";
import { useLocation, useNavigate } from "@tanstack/react-router";
import type { CreateUserDTOType } from "../data";

export const useUpdateUser = () => {
    const { updateUser, resetUpdateUser } = useUserStore();
    const navigate = useNavigate();
    const location = useLocation();

    const handleUpdateUser = async (id: string | number, data: CreateUserDTOType): Promise<void> => {
        console.log("test");
        if (id && data) {
            await updateUser.updateUser(id, data);
        }
    };

    useEffect(() => {
        if (updateUser.state.state === "success") {
            toast.error(updateUser.state.data.message || "update user successfully");

            navigate({ to: `/dashboard/user/${location.search.type}` });
        }

        if (updateUser.state.state === "error") {
            toast.error(updateUser.state.error || "Failed to update user");
        }

        return () => {
            resetUpdateUser();
        };
    }, [updateUser.state.state, resetUpdateUser]);

    const isLoading = updateUser.state.state === "loading";

    return {
        handleUpdateUser,
        isLoading,
    };
};
