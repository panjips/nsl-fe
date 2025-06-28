import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuthStore } from "../stores";
import {
    ResetPasswordReqDTO as ResetPasswordSchema,
    type ResetPasswordReqDTOType as ResetPasswordSchemaType,
} from "../data";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "@/lib/utils";

export function useResetPassword() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);
    const { token }: { token: string } = useSearch({
        strict: true,
        from: "/(auth)/reset-password",
    });

    const { resetPassword, resetPasswordState, resetResetPasswordState } = useAuthStore();

    const form = useForm<ResetPasswordSchemaType>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;

        if (resetPasswordState.state === "success") {
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        resetResetPasswordState();
                        navigate({ to: "/login" });
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            toast.success(resetPasswordState.data?.message || "Password successfully reset");
        }

        if (resetPasswordState.state === "error") {
            toast.error(capitalizeFirstLetter(resetPasswordState.error));
            resetResetPasswordState();
        }

        return () => {
            clearInterval(timer);
        };
    }, [resetPasswordState, navigate, resetResetPasswordState]);

    useEffect(() => {
        if (resetPasswordState.state !== "success") {
            setCountdown(5);
        }
    }, [resetPasswordState.state]);

    const onSubmit = async (data: ResetPasswordSchemaType) => {
        if (!token) {
            toast.error("Reset token is missing. Please request a new password reset link.");
            return;
        }

        await resetPassword(data, token);
    };

    return {
        form,
        onSubmit,
        isLoading: resetPasswordState.state === "loading",
        isSuccess: resetPasswordState.state === "success",
        errorMessage: resetPasswordState.state === "error" ? resetPasswordState.error : null,
        countdown,
        hasToken: !!token,
    };
}
