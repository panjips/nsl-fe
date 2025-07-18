import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LoginReqDTO as LoginSchema, type LoginReqDTOType as LoginSchemaType } from "../data";
import { useAuthStore } from "../stores/store";
import { toast } from "sonner";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useGlobalAuthStore } from "@/stores";

export const useLogin = () => {
    const navigate = useNavigate();
    const { login, loginState, resetLoginState } = useAuthStore();
    const { login: setGlobalUser, setAuthLoading } = useGlobalAuthStore();
    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginSchemaType) => {
        setAuthLoading(true);
        await login(data);
    };

    const navigateByRole = (role: string) => {
        switch (role) {
            case "Pelanggan":
                navigate({ to: "/" });
                break;
            case "Kasir":
                navigate({ to: "/dashboard/pos" });
                break;
            case "Staf":
                navigate({ to: "/dashboard" });
                break;
            case "Pemilik":
                navigate({ to: "/dashboard" });
                break;
            default:
                navigate({ to: "/" });
                break;
        }
    };

    useEffect(() => {
        if (loginState.state === "success" && loginState.data.data?.user) {
            setGlobalUser(loginState.data.data.user, loginState.data.data?.token);
            navigateByRole(loginState.data.data.user.role);
            toast.success(capitalizeFirstLetter(loginState.data.message));
            resetLoginState();
        }
        if (loginState.state === "error") {
            toast.error(capitalizeFirstLetter(loginState.error));
            resetLoginState();
        }
    }, [loginState, navigate]);

    return {
        form,
        onSubmit,
        isLoading: loginState.state === "loading",
        errorMessage: loginState.state === "error" ? loginState.error : null,
    };
};
