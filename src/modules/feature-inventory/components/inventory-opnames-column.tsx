import { createTypedColumnHelper } from "@/components/data-table/types";
import type { InventoryOpname } from "../domain";
import type { ColumnHelper } from "@tanstack/react-table";
import { formatDateTime } from "@/lib/utils";

export const inventoryOpnameColumnHelper = createTypedColumnHelper<InventoryOpname>();

export interface SetupInventoryColumnsProps {
    columnHelper: ColumnHelper<InventoryOpname>;
}

export const setupInventoryOpnameColumns = ({ columnHelper }: SetupInventoryColumnsProps) => {
    return [
        columnHelper.accessor("id", {
            header: "ID",
            meta: {
                headColStyle: {
                    textAlign: "left",
                    fontWeight: "bold",
                },
                bodyColStyle: {
                    textAlign: "left",
                },
            },
            cell: ({ row }) => {
                return <div>{row.original.id}</div>;
            },
        }),
        columnHelper.accessor("inventory.name", {
            header: "Name",
            meta: {
                headColStyle: {
                    textAlign: "left",
                    fontWeight: "bold",
                },
                bodyColStyle: {
                    textAlign: "left",
                },
            },
            cell: ({ row }) => {
                return <div>{row.original.inventory.name}</div>;
            },
        }),
        columnHelper.accessor("actual_quantity", {
            header: "Actual Quantity",
            meta: {
                headColStyle: {
                    textAlign: "left",
                    fontWeight: "bold",
                },
                bodyColStyle: {
                    textAlign: "left",
                },
            },
            cell: ({ row }) => {
                return (
                    <div>
                        {row.original.actual_quantity} {row.original.inventory.unit}
                    </div>
                );
            },
        }),
        columnHelper.accessor("system_quantity", {
            header: "System Quantity",
            meta: {
                headColStyle: {
                    textAlign: "left",
                    fontWeight: "bold",
                },
                bodyColStyle: {
                    textAlign: "left",
                },
            },
            cell: ({ row }) => {
                return (
                    <div>
                        {row.original.system_quantity} {row.original.inventory.unit}
                    </div>
                );
            },
        }),
        columnHelper.accessor("difference", {
            header: "Difference",
            meta: {
                headColStyle: {
                    textAlign: "left",
                    fontWeight: "bold",
                },
                bodyColStyle: {
                    textAlign: "left",
                },
            },
            cell: ({ row }) => {
                return (
                    <div>
                        {row.original.difference} {row.original.inventory.unit}
                    </div>
                );
            },
        }),
        columnHelper.accessor("notes", {
            header: "Notes",
            meta: {
                headColStyle: {
                    textAlign: "left",
                    fontWeight: "bold",
                },
                bodyColStyle: {
                    textAlign: "left",
                },
            },
            cell: ({ row }) => {
                return <div>{row.original.notes}</div>;
            },
        }),
        columnHelper.accessor("opname_date", {
            header: "Date",
            meta: {
                headColStyle: {
                    textAlign: "left",
                    fontWeight: "bold",
                },
                bodyColStyle: {
                    textAlign: "left",
                },
            },
            cell: ({ row }) => {
                return <div>{formatDateTime(row.original.opname_date)}</div>;
            },
        }),
    ];
};
