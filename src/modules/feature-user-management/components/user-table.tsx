import { DataTable } from "@/components/data-table";
import { useMemo } from "react";
import { setupUserColumns, userColumnHelper } from "./user-column";
import { useListUser } from "../hooks";
import { useNavigate } from "@tanstack/react-router";
import { useDeleteUser } from "../hooks/use-delete-user";
import { UserDeleteModal } from "./user-delete-modal";
import { useUserStore } from "../stores";

export const UserTable = ({ type }: { type: string }) => {
    const { data, isLoading, setSearchTerm, searchTerm } = useListUser();
    const { handleDeleteUser } = useDeleteUser();
    const { modal } = useUserStore();
    const navigate = useNavigate();

    const handleEdit = (id: string | number) => {
        navigate({
            to: "/dashboard/user/update/$userId",
            params: { userId: id.toString() },
            search: { type: type },
        });
    };

    const columns = useMemo(() => {
        return setupUserColumns({
            columnHelper: userColumnHelper,
            onEdit: handleEdit,
            onDelete: handleDeleteUser,
        });
    }, []);

    return (
        <>
            <DataTable
                key={data?.length}
                isLoading={isLoading}
                data={data || []}
                columns={columns}
                enablePagination={true}
                enableSearch={true}
                onSearch={setSearchTerm}
                searchValue={searchTerm}
            />

            <UserDeleteModal id={modal.id ?? undefined} />
        </>
    );
};
