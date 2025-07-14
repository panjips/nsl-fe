import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateUserDTO, type CreateUserDTOType } from "../data";
import { useCreateUser } from "./use-create-user";
import { useUpdateUser } from "./use-update-user";
import { useUserStore } from "../stores";
import { useEffect } from "react";

export const useFormUser = () => {
    const { handleCreateUser, isLoading: isLoadingCreate } = useCreateUser();
    const { handleUpdateUser, isLoading: isLoadingEdit } = useUpdateUser();
    const { getUser } = useUserStore();

    const id = getUser.state.state === "success" ? getUser.state.data.data?.id : null;

    const form = useForm<CreateUserDTOType>({
        resolver: zodResolver(CreateUserDTO),
        defaultValues: {
            name: undefined,
            email: undefined,
            username: undefined,
            password: undefined,
            role: undefined,
            phone_number: undefined,
        },
    });

    useEffect(() => {
        if (id && getUser.state.state === "success") {
            const user = getUser.state.data;

            form.reset({
                name: user.data?.name ?? "",
                email: user.data?.email ?? "",
                username: user.data?.username ?? "",
                role: user.data?.role?.name ?? "",
                phone_number: user.data?.phone_number ?? "",
            });
        }
    }, [id, getUser.state, form]);

    const handleSubmit = async (data: CreateUserDTOType) => {

        if (id) {
            await handleUpdateUser(id, data);
        } else {
            await handleCreateUser(data);
        }
    };

    return {
        form,
        id,
        handleSubmit,
        isLoading: isLoadingCreate || isLoadingEdit,
    };
};
