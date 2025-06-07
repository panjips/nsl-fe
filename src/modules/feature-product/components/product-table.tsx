import { DataTable } from "@/components/data-table";
import { useMemo } from "react";
import { setupProductColumns, productColumnHelper } from "./product-column";
import { useListProduct } from "../hooks";
import { useNavigate } from "@tanstack/react-router";
import { useDeleteProduct } from "../hooks/use-delete-product";

export const ProductTable = () => {
    const { data, isLoading, setSearchTerm, searchTerm } = useListProduct();
    const { handleDeleteProduct } = useDeleteProduct();
    const navigate = useNavigate();

    const handleEdit = (id: string | number) => {
        navigate({
            to: "/dashboard/product/update/$productId",
            params: { productId: id.toString() },
        });
    };

    const columns = useMemo(() => {
        return setupProductColumns({
            columnHelper: productColumnHelper,
            onEdit: handleEdit,
            onDelete: handleDeleteProduct,
        });
    }, []);

    return (
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
    );
};
