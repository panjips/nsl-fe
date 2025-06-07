import { addonRecipeColumnHelper, setupAddonRecipeColumns } from "./addon-recipe-column";
import { AddonRecipeMutationModal } from "./addon-recipe-mutation-modal";
import { AddonRecipeDeleteModal } from "./addon-recipe-delete-modal";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useAddonRecipeStore } from "../stores";
import type { AddonRecipe } from "../domain/addon-recipe";
import { useListAddonRecipe } from "../hooks/use-list-addon-recipe";
import { useMemo } from "react";

export const AddonRecipeTable = () => {
    const { data, isLoading, setSearchTerm, searchTerm } = useListAddonRecipe();
    const { modal } = useAddonRecipeStore();

    const handleOpenModalEdit = (id: string | number, data: AddonRecipe) => {
        modal.onOpen("edit", data, id);
    };

    const handleOpenModalCreate = () => {
        modal.onOpen("create");
    };

    const handleOpenModalDelete = (id: string | number) => {
        modal.onOpen("delete", null, id);
    };

    const columns = useMemo(() => {
        return setupAddonRecipeColumns({
            columnHelper: addonRecipeColumnHelper,
            onEdit: handleOpenModalEdit,
            onDelete: handleOpenModalDelete,
        });
    }, []);

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex-1" />
                <Button variant="default" onClick={handleOpenModalCreate} className="w-fit">
                    Create Addon Recipe
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

            <AddonRecipeMutationModal addonId={modal.data?.id ?? modal.addonId ?? undefined} />
            <AddonRecipeDeleteModal />
        </>
    );
};
