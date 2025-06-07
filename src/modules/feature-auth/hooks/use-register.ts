import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { RegisterReqDTO as RegisterSchema, type RegisterReqDTOType as RegisterSchemaType } from "../data";
import { useAuthStore } from "../stores/store";
import { toast } from "sonner";
import { capitalizeFirstLetter } from "@/lib/utils";

export const useRegister = () => {
    const navigate = useNavigate();
    const { register, registerState, resetRegisterState } = useAuthStore();

    const form = useForm<RegisterSchemaType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            username: "",
            password: "",
            phone_number: "",
        },
    });

    const onSubmit = async (data: RegisterSchemaType) => {
        await register(data);
    };

    useEffect(() => {
        if (registerState.state === "success") {
            navigate({ to: "/login" });
            toast.success(registerState.data.message);
            resetRegisterState();
        }

        if (registerState.state === "error") {
            toast.error(capitalizeFirstLetter(registerState.error));
            resetRegisterState();
        }
    }, [registerState, navigate]);

    return {
        form,
        onSubmit,
        isLoading: registerState.state === "loading",
        errorMessage: registerState.state === "error" ? registerState.error : null,
    };
};
