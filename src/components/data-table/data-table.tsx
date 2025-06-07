import { DndContext, closestCenter } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { useDataTable } from "./hooks/use-data-table";
import { DraggableRow, StandardRow } from "./table-row";
import { ColumnVisibility } from "./column-visibility";
import { TablePagination } from "./table-pagination";
import { TableSkeleton } from "./table-skeleton";
import type { DataTableProps, TableRowData } from "./types";
import { SearchInput } from "@/components/search-input";

import type { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
    interface ColumnMeta<TData extends RowData, TValue> {
        headColStyle?: React.CSSProperties;
        bodyColStyle?: React.CSSProperties;
    }
}

export interface DataTablePropsWithLoading<TData extends TableRowData> extends DataTableProps<TData> {
    isLoading?: boolean;
    enableSearch?: boolean;
    onSearch?: (value: string) => void;
    searchPlaceholder?: string;
    searchValue?: string;
}

export function DataTable<TData extends TableRowData>({
    data,
    columns,
    enableDragDrop = false,
    enableRowSelection = false,
    enablePagination = true,
    enableSearch = false,
    onSearch,
    searchPlaceholder = "Search...",
    searchValue,
    defaultPageSize = 10,
    isLoading = false,
}: DataTablePropsWithLoading<TData>) {
    const { table, sortableId, sensors, handleDragEnd, itemIds } = useDataTable<TData>({
        data,
        columns,
        enableDragDrop,
        enableRowSelection,
        enablePagination,
        defaultPageSize,
    });

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <div>{/* Empty space for filters */}</div>
                    <div className="flex items-center gap-2">
                        {/* Skeleton for table controls */}
                        <div className="h-9 w-[140px] animate-pulse rounded-md bg-muted" />
                    </div>
                </div>

                <TableSkeleton
                    columnCount={columns.length - (enableRowSelection ? 1 : 0)}
                    rowCount={defaultPageSize}
                    showCheckbox={enableRowSelection}
                />

                {enablePagination && (
                    <div className="flex justify-between items-center px-4 animate-pulse">
                        <div className="h-4 w-[200px] bg-muted rounded" />
                        <div className="flex gap-2">
                            <div className="h-8 w-8 bg-muted rounded" />
                            <div className="h-8 w-8 bg-muted rounded" />
                            <div className="h-8 w-8 bg-muted rounded" />
                            <div className="h-8 w-8 bg-muted rounded" />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <ColumnVisibility table={table} />
                    {/* Add other table controls here */}
                </div>
                <div className="flex-1 max-w-1/2 md:max-w-1/3">
                    {enableSearch && (
                        <SearchInput
                            placeholder={searchPlaceholder}
                            onSearch={onSearch}
                            className="w-full"
                            value={searchValue}
                        />
                    )}
                </div>
            </div>

            <div className="rounded-md border">
                {enableDragDrop ? (
                    <DndContext
                        collisionDetection={closestCenter}
                        modifiers={[restrictToVerticalAxis]}
                        onDragEnd={handleDragEnd}
                        sensors={sensors}
                        id={sortableId}
                    >
                        <Table>
                            <TableHeader className="bg-muted sticky top-0 z-10">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead
                                                key={header.id}
                                                colSpan={header.colSpan}
                                                style={header.column.columnDef.meta?.headColStyle}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    <SortableContext items={itemIds || []} strategy={verticalListSortingStrategy}>
                                        {table.getRowModel().rows.map((row) => (
                                            <DraggableRow key={row.id} row={row} />
                                        ))}
                                    </SortableContext>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </DndContext>
                ) : (
                    <Table>
                        <TableHeader className="bg-muted sticky top-0 z-10">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            style={header.column.columnDef.meta?.headColStyle}
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => <StandardRow key={row.id} row={row} />)
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>

            {enablePagination && <TablePagination table={table} />}
        </div>
    );
}
