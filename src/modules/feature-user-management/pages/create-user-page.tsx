import { PageHeader } from "@/components/page-header";
import { UserForm } from "../components";
import { useSearch } from "@tanstack/react-router";

export const CreateUserPage = () => {
    const { type }: { type: string } = useSearch({
        from: "/dashboard/_sidebarLayout/user/create",
    });

    return (
        <div className="flex flex-col gap-4">
            <PageHeader title="Create User" showBackButton backTo={`/dashboard/user/${type}`} />
            <UserForm type={type} />
        </div>
    );
};
