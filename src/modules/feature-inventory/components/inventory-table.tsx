import { inventoryColumnHelper, setupInventoryColumns } from "./inventory-column";
import { InventoryMutationModal } from "./inventory-mutation-modal";
import { InventoryDeleteModal } from "./inventory-delete-modal";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useInventoryStore } from "../stores";
import type { Inventory } from "../domain";
import { useListInventory } from "../hooks";
import { useMemo } from "react";

export const InventoryTable = () => {
    const { data, isLoading, setSearchTerm, searchTerm } = useListInventory();
    const { modal } = useInventoryStore();

    const handleOpenModalEdit = (data: Inventory) => {
        modal.onOpen("edit", data);
    };

    const handleOpenModalCreate = () => {
        modal.onOpen("create");
    };

    const handleOpenModalDelete = (id: string | number) => {
        modal.onOpen("delete", null, id);
    };

    const columns = useMemo(() => {
        return setupInventoryColumns({
            columnHelper: inventoryColumnHelper,
            onEdit: handleOpenModalEdit,
            onDelete: handleOpenModalDelete,
        });
    }, []);

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex-1"/>
                <Button variant="default" onClick={handleOpenModalCreate} className="w-fit">
                    Create Inventory
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
            <InventoryMutationModal id={modal.data?.id} />
            <InventoryDeleteModal id={modal.id ?? undefined} />
        </>
    );
};
