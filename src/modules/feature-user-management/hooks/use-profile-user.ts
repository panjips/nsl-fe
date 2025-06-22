import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "../stores";
import type { UpdateUserDTOType } from "../data";
import { toast } from "sonner";

export const useProfileUser = () => {
    const { getUser, updateUser, resetPasswordProfile, resetUpdateUser, resetResetPasswordProfile } = useUserStore();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editError, setEditError] = useState("");

    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const userData = useMemo(() => {
        if (getUser.state.state === "success") {
            return getUser.state.data.data;
        }
        return null;
    }, [getUser.state]);

    const [editForm, setEditForm] = useState({
        name: userData?.name || "",
        username: userData?.username || "",
        email: userData?.email || "",
        phone_number: userData?.phone_number || "",
    });

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEditError("");

        if (!editForm.name.trim()) {
            setEditError("Name is required");
            return;
        }

        if (!editForm.username.trim()) {
            setEditError("Username is required");
            return;
        }

        if (!editForm.email.trim() || !editForm.email.includes("@")) {
            setEditError("Please enter a valid email address");
            return;
        }

        if (!editForm.phone_number.trim()) {
            setEditError("Phone number is required");
            return;
        }

        const updatedData: UpdateUserDTOType = {
            name: editForm.name,
            username: editForm.username,
            email: editForm.email,
            phone_number: editForm.phone_number,
        };

        await updateUser.updateUser(userData?.id || "", updatedData);

        setIsEditModalOpen(false);
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError("");

        if (newPassword.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        await resetPasswordProfile.resetPasswordProfile({
            newPassword: newPassword,
            newPasswordConfirm: confirmPassword,
        });

        setIsPasswordModalOpen(false);
        setNewPassword("");
        setConfirmPassword("");
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setEditForm({
            name: userData?.name || "",
            username: userData?.username || "",
            email: userData?.email || "",
            phone_number: userData?.phone_number || "",
        });
        setEditError("");
    };

    const handleInputChange = (field: string, value: string) => {
        setEditForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleModalClose = () => {
        setIsPasswordModalOpen(false);
        setNewPassword("");
        setConfirmPassword("");
        setPasswordError("");
    };

    const getUserData = async () => {
        if (userData?.id) {
            await getUser.getUser(userData.id);
        }
    };

    useEffect(() => {
        if (updateUser.state.state === "success") {
            resetUpdateUser();
            getUserData();
        }

        if (updateUser.state.state === "error") {
            toast.error(updateUser.state.error || "Failed to update user");
        }

        if (resetPasswordProfile.state.state === "success") {
            resetResetPasswordProfile();
            toast.success("Password reset successfully");
        }

        if (resetPasswordProfile.state.state === "error") {
            toast.error(resetPasswordProfile.state.error || "Failed to reset password");
        }
    }, [updateUser.state, resetPasswordProfile.state]);

    return {
        userData,
        isLoading: getUser.state.state === "loading",
        isLoadingPassword: resetPasswordProfile.state.state === "loading",

        editForm,
        setEditForm,
        handleEditSubmit,

        isEditModalOpen,
        setIsEditModalOpen,
        editError,
        setEditError,

        handlePasswordSubmit,
        isPasswordModalOpen,
        setIsPasswordModalOpen,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        showNewPassword,
        setShowNewPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        passwordError,
        setPasswordError,
        handleEditModalClose,
        handleInputChange,
        handleModalClose,
    };
};
