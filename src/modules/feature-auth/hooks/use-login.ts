import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  LoginReqDTO as LoginSchema,
  type LoginReqDTOType as LoginSchemaType,
} from "../data";
import { useAuthStore } from "../stores/store";
import { toast } from "sonner";
import { capitalizeFirstLetter } from "@/lib/utils";

export const useLogin = () => {
  const navigate = useNavigate();
  const { login, loginState, resetLoginState } = useAuthStore();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    await login(data);
  };

  useEffect(() => {
    if (loginState.state === "success") {
      navigate({ to: "/" });
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
