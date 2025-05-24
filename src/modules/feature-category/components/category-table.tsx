import { categoryColumnHelper, setupCategoryColumns } from "./category-column";
import { CategoryMutationModal } from "./category-mutation-modal";
import { CategoryDeleteModal } from "./category-delete-modal";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useCategoryStore } from "../stores";
import type { Category } from "../domain";
import { useListCategory } from "../hooks";
import { useMemo } from "react";

export const CategoryTable = () => {
  const { data, isLoading, setSearchTerm, searchTerm } = useListCategory();
  const { modal } = useCategoryStore();

  const handleOpenModalEdit = (data: Category) => {
    modal.onOpen("edit", data);
  };

  const handleOpenModalCreate = () => {
    modal.onOpen("create");
  };

  const handleOpenModalDelete = (id: string | number) => {
    modal.onOpen("delete", null, id);
    
  };

  const columns = useMemo(() => {
    return setupCategoryColumns({
      columnHelper: categoryColumnHelper,
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
          Create Category
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
      <CategoryMutationModal id={modal.data?.id} />
      <CategoryDeleteModal id={modal.id ?? undefined} />
    </>
  );
};
