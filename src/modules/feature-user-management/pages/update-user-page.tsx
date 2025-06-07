import { PageHeader } from "@/components/page-header";
import { UserForm } from "../components";
import { useSearch } from "@tanstack/react-router";

export const UpdateUserPage = () => {
    const { type }: { type: string } = useSearch({
        from: "/dashboard/_sidebarLayout/user/update/$userId",
    });

    return (
        <div className="flex flex-col gap-4">
            <PageHeader title="Update User" showBackButton backTo={`/dashboard/user/${type}`} />
            <UserForm type={type} />
        </div>
    );
};
