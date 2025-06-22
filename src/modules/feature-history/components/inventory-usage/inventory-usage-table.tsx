import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { useHistoryStore } from "../../stores";

import { useInventoryUsage } from "../../hooks";
import { InventoryUsageDetailModal } from "./inventory-usage-detail-modal";
import { inventoryUsageColumnHelper, setupInventoryUsageColumns } from "./inventory-usage-column";
import type { OrderInventoryUsage } from "../../domain";

export const InventoryUsageTable = () => {
    const { data, isLoading, setSearchTerm, searchTerm } = useInventoryUsage();
    const { modal } = useHistoryStore();

    const handleOpenDetail = (id: number | string, data?: OrderInventoryUsage) => {
        modal.onOpen("detail", data, id);
    };

    const columns = useMemo(() => {
        return setupInventoryUsageColumns({
            columnHelper: inventoryUsageColumnHelper,
            onDetail: handleOpenDetail,
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

            <InventoryUsageDetailModal />
        </>
    );
};
