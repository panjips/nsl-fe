import { DataTable } from "@/components/data-table";
import { useMemo } from "react";
import { setupProductColumns, productColumnHelper } from "./product-column";
import { useListProduct } from "../hooks";
import { useNavigate } from "@tanstack/react-router";
import { useProductStore } from "../stores";
import { ProductDeleteModal } from "./product-delete-modal";

export const ProductTable = () => {
    const { data, isLoading, setSearchTerm, searchTerm } = useListProduct();
    const { modal } = useProductStore();
    const navigate = useNavigate();

    const handleEdit = (id: string | number) => {
        navigate({
            to: "/dashboard/product/update/$productId",
            params: { productId: id.toString() },
        });
    };

    const handleOpenDeleteModal = (id: string | number) => {
        modal.onOpen("delete", id);
    };

    const columns = useMemo(() => {
        return setupProductColumns({
            columnHelper: productColumnHelper,
            onEdit: handleEdit,
            onDelete: handleOpenDeleteModal,
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

            <ProductDeleteModal id={modal.id ?? undefined} />
        </>
    );
};
