import { cateringPackageColumnHelper, setupCateringPackageColumns } from "./catering-package-column";
import { CateringPackageMutationModal } from "./catering-package-mutation-modal";
import { CateringPackageDeleteModal } from "./catering-package-delete-modal";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useCateringPackageStore } from "../stores";
import type { CateringPackage } from "../domain";
import { useListCateringPackage } from "../hooks";
import { useMemo } from "react";

export const CateringPackageTable = () => {
    const { data, isLoading, setSearchTerm, searchTerm } = useListCateringPackage();
    const { modal } = useCateringPackageStore();

    const handleOpenModalEdit = (id: string | number, data: CateringPackage) => {
        modal.onOpen("edit", data, id);
    };

    const handleOpenModalCreate = () => {
        modal.onOpen("create");
    };

    const handleOpenModalDelete = (id: string | number) => {
        modal.onOpen("delete", null, id);
    };

    const columns = useMemo(() => {
        return setupCateringPackageColumns({
            columnHelper: cateringPackageColumnHelper,
            onEdit: handleOpenModalEdit,
            onDelete: handleOpenModalDelete,
        });
    }, []);

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex-1" />
                <Button variant="default" onClick={handleOpenModalCreate} className="w-fit">
                    Create Catering Package
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

            <CateringPackageMutationModal id={modal.data?.id ?? modal.id ?? undefined} />
            <CateringPackageDeleteModal />
        </>
    );
};
