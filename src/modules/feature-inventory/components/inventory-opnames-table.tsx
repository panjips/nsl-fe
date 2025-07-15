import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useListInventoryOpnames } from "../hooks";
import { useMemo } from "react";
import { inventoryOpnameColumnHelper, setupInventoryOpnameColumns } from "./inventory-opnames-column";
import { useInventoryStore } from "../stores";
import { InventoryOpnameModal } from "./inventory-opnames-create-modal";

export const InventoryOpnameTable = () => {
    const { data, isLoading, setSearchTerm, searchTerm } = useListInventoryOpnames();
    const { modalOpname } = useInventoryStore();

    const columns = useMemo(() => {
        return setupInventoryOpnameColumns({
            columnHelper: inventoryOpnameColumnHelper,
        });
    }, []);

    const handleOpenModalCreate = () => {
        modalOpname.onOpen("create");
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex-1" />
                <Button variant="default" onClick={handleOpenModalCreate} className="w-fit">
                    Create Inventory Opname
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
            <InventoryOpnameModal />
        </>
    );
};
