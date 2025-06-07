import { productRecipeColumnHelper, setupProductRecipeColumns } from "./product-recipe-column";
import { ProductRecipeMutationModal } from "./product-recipe-mutation-modal";
import { ProductRecipeDeleteModal } from "./product-recipe-delete-modal";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useProductRecipeStore } from "../stores";
import type { ProductRecipe } from "../domain/product-recipe";
import { useListProductRecipe } from "../hooks/use-list-product-recipe";
import { useMemo } from "react";

export const ProductRecipeTable = () => {
    const { data, isLoading, setSearchTerm, searchTerm } = useListProductRecipe();
    const { modal } = useProductRecipeStore();

    const handleOpenModalEdit = (id: string | number, data: ProductRecipe) => {
        modal.onOpen("edit", data, id);
    };

    const handleOpenModalCreate = () => {
        modal.onOpen("create");
    };

    const handleOpenModalDelete = (id: string | number) => {
        modal.onOpen("delete", null, id);
    };

    const columns = useMemo(() => {
        return setupProductRecipeColumns({
            columnHelper: productRecipeColumnHelper,
            onEdit: handleOpenModalEdit,
            onDelete: handleOpenModalDelete,
        });
    }, []);

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex-1" />
                <Button variant="default" onClick={handleOpenModalCreate} className="w-fit">
                    Create Product Recipe
                </Button>
            </div>

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

            <ProductRecipeMutationModal productId={modal.data?.id ?? modal.productId ?? undefined} />
            <ProductRecipeDeleteModal />
        </>
    );
};
