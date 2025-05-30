import { addonColumnHelper, setupAddonColumns } from "./addon-column";
import { AddonMutationModal } from "./addon-mutation-modal";
import { AddonDeleteModal } from "./addon-delete-modal";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useAddonStore } from "../stores";
import type { Addon } from "../domain";
import { useListAddon } from "../hooks";
import { useMemo } from "react";

export const AddonTable = () => {
  const { data, isLoading, setSearchTerm, searchTerm } = useListAddon();
  const { modal } = useAddonStore();

  const handleOpenModalEdit = (data: Addon) => {
    modal.onOpen("edit", data);
  };

  const handleOpenModalCreate = () => {
    modal.onOpen("create");
  };

  const handleOpenModalDelete = (id: string | number) => {
    modal.onOpen("delete", null, id);
  };

  const columns = useMemo(() => {
    return setupAddonColumns({
      columnHelper: addonColumnHelper,
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
          Create Add-on
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
      <AddonMutationModal id={modal.data?.id} />
      <AddonDeleteModal id={modal.id ?? undefined} />
    </>
  );
};