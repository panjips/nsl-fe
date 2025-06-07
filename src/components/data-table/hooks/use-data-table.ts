import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
} from "@tanstack/react-table";
import { useDraggableTable } from "./use-draggable-table";
import { useTableState } from "./use-table-state";
import type { DataTableProps, TableRowData } from "../types";

export function useDataTable<TData extends TableRowData>({
    data: initialData,
    columns,
    enableDragDrop = false,
    enableRowSelection = true,
    enablePagination = true,
    defaultPageSize = 10,
}: DataTableProps<TData>) {
    const {
        rowSelection,
        setRowSelection,
        columnVisibility,
        setColumnVisibility,
        columnFilters,
        setColumnFilters,
        sorting,
        setSorting,
        pagination,
        setPagination,
    } = useTableState();

    const { data, setData, sortableId, sensors, handleDragEnd, itemIds } = useDraggableTable<TData>(
        initialData,
        (item) => item.id as unknown as string | number,
    );

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        getRowId: (row) => row.id.toString(),
        enableRowSelection,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        initialState: {
            pagination: {
                pageSize: defaultPageSize,
            },
        },
    });

    return {
        table,
        data,
        setData,
        enableDragDrop,
        sortableId: enableDragDrop ? sortableId : undefined,
        sensors: enableDragDrop ? sensors : undefined,
        handleDragEnd: enableDragDrop ? handleDragEnd : undefined,
        itemIds: enableDragDrop ? itemIds : undefined,
    };
}
