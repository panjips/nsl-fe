import { useMemo } from "react";
import type { OnlineOrder } from "../domain";
import { useProcessingOrder } from "../hooks";
import { onlineOrderStore } from "../stores";
import { onlineOrderColumnHelper, setupOnlineOrderColumns } from "./online-order-column";
import { DataTable } from "@/components/data-table";
import { OnlineOrderStatusModal } from "./online-order-status-modal";
import { OnlineOrderDetailModal } from "./online-order-detail-modal";
import { ConfirmationStrickerModal } from "@/modules/feature-pos/components/sticker-detail-product-modal";

export const OnlineOrderTable = () => {
    const { data, isLoading, setSearchTerm, searchTerm } = useProcessingOrder();
    const { modalTable } = onlineOrderStore();

    const handleOpenUpdateStatus = (id: number | string, data?: OnlineOrder) => {
        modalTable.onOpen("edit", id, data);
    };

    const handleOpenDetail = (id: number | string, data?: OnlineOrder) => {
        modalTable.onOpen("detail", id, data);
    };

    const columns = useMemo(() => {
        return setupOnlineOrderColumns({
            columnHelper: onlineOrderColumnHelper,
            onDetail: handleOpenDetail,
            onUpdateStatus: handleOpenUpdateStatus,
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

            <OnlineOrderDetailModal />
            <OnlineOrderStatusModal id={modalTable.id || undefined} data={modalTable.data || undefined} />
            <ConfirmationStrickerModal />
        </>
    );
};
