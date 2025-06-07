import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuthStore } from "../stores";
import {
    ForgotPasswordReqDTO as ForgotPasswordSchema,
    type ForgotPasswordReqDTOType as ForgotPasswordSchemaType,
} from "../data";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function useForgotPassword() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);
    const { resetForgotPasswordState, forgotPassword, forgotPasswordState } = useAuthStore();

    const form = useForm<ForgotPasswordSchemaType>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;

        if (forgotPasswordState.state === "success") {
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        resetForgotPasswordState();
                        navigate({ to: "/login" });
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            toast.success(forgotPasswordState.data.message);
        }

        if (forgotPasswordState.state === "error") {
            toast.error(forgotPasswordState.error);
            resetForgotPasswordState();
        }

        return () => {
            clearInterval(timer);
        };
    }, [forgotPasswordState.state, navigate, resetForgotPasswordState]);

    useEffect(() => {
        if (forgotPasswordState.state !== "success") {
            setCountdown(5);
        }
    }, [forgotPasswordState.state]);

    const onSubmit = async (data: ForgotPasswordSchemaType) => {
        await forgotPassword(data);
    };

    return {
        form,
        onSubmit,
        isLoading: forgotPasswordState.state === "loading",
        isSuccess: forgotPasswordState.state === "success",
        errorMessage: forgotPasswordState.state === "error" ? forgotPasswordState.error : null,
        countdown,
    };
}
