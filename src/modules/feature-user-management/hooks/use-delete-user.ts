import { useEffect } from "react";
import { useUserStore } from "../stores";
import { toast } from "sonner";
import { useLastCurrentLocation } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";

export const useDeleteUser = () => {
    const { deleteUser, users, resetDeleteUser, modal, resetModal } = useUserStore();
    const navigate = useNavigate();

    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            modal.onClose();
            resetModal();
        }
    };

    const handleSubmitDelete = async (id: string | number) => {
        try {
            await deleteUser.deleteUser(id);
            await users.getUsers(); // Refresh the user list
        } catch (error) {
            console.error("Failed to delete user:", error);
        } finally {
            modal.onClose();
            resetModal();
        }
    };

    // Simple method for direct deletion (for backward compatibility)
    const handleDeleteUser = (id: string | number) => {
        modal.onOpen("delete", id);
    };

    useEffect(() => {
        if (deleteUser.state.state === "success") {
            toast.success("User deleted successfully");
            resetDeleteUser();
        }
        if (deleteUser.state.state === "error") {
            toast.error(deleteUser.state.error || "Failed to delete user");
            resetDeleteUser();
        }
    }, [deleteUser.state.state, resetDeleteUser]);

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
        isOpen: modal.isOpen && modal.mode === "delete",
        onOpenChange,
        handleSubmitDelete,
        handleDeleteUser,
        isLoading: deleteUser.state.state === "loading",
    };
};
