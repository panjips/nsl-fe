import { purchaseColumnHelper, setupPurchaseColumns } from "./purchase-column";
import { PurchaseMutationModal } from "./purchase-mutation-modal";
import { PurchaseDeleteModal } from "./purchase-delete-modal";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { usePurchaseStore } from "../stores";
import type { PurchaseWithInventory } from "../domain/purhcase";
import { useListPurchase } from "../hooks";
import { useMemo } from "react";

export const PurchaseTable = () => {
  const { data, isLoading, setSearchTerm, searchTerm } = useListPurchase();
  const { modal } = usePurchaseStore();

  const handleOpenModalEdit = (data: PurchaseWithInventory) => {
    modal.onOpen("edit", data);
  };

  const handleOpenModalCreate = () => {
    modal.onOpen("create");
  };

  const handleOpenModalDelete = (id: string | number) => {
    modal.onOpen("delete", null, id);
  };

  const columns = useMemo(() => {
    return setupPurchaseColumns({
      columnHelper: purchaseColumnHelper,
      onEdit: handleOpenModalEdit,
      onDelete: handleOpenModalDelete,
    });
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex-1"></div>
        <Button
          variant="default"
          onClick={handleOpenModalCreate}
          className="w-fit"
        >
          Create Purchase
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
      <PurchaseMutationModal id={modal.data?.id} />
      <PurchaseDeleteModal id={modal.id ?? undefined} />
    </>
  );
};