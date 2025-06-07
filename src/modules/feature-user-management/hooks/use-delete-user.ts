import { useEffect } from "react";
import { useUserStore } from "../stores";
import { toast } from "sonner";
import { useLastCurrentLocation } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";

export const useDeleteUser = () => {
    const { deleteUser, resetDeleteUser } = useUserStore();
    const navigate = useNavigate();

    const handleDeleteUser = async (id: string | number) => {
        if (id) {
            await deleteUser.deleteUser(id);
        }
    };

    const currentLocation = useLastCurrentLocation();

    useEffect(() => {
        if (deleteUser.state.state === "success") {
            toast.success(deleteUser.state.data.message || "Product delete successfully");
            navigate({ to: ("/dashboard/user/" + currentLocation) as any });
        }
        if (deleteUser.state.state === "error") {
            toast.error(deleteUser.state.error || "Failed to delete product");
        }
        return () => {
            resetDeleteUser();
        };
    }, [deleteUser.state.state]);

    return {
        handleDeleteUser,
    };
};
