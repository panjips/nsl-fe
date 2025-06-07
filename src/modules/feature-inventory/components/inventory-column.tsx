import { createTypedColumnHelper } from "@/components/data-table/types";
import type { Inventory } from "../domain";
import type { ColumnHelper } from "@tanstack/react-table";
import { TableActions } from "@/components/dropdown-table-action";

export const inventoryColumnHelper = createTypedColumnHelper<Inventory>();

export interface SetupInventoryColumnsProps {
    columnHelper: ColumnHelper<Inventory>;
    onEdit?: (data: Inventory) => void;
    onDelete?: (id: string | number) => void;
}

export const setupInventoryColumns = ({ columnHelper, onEdit, onDelete }: SetupInventoryColumnsProps) => {
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
        columnHelper.accessor("name", {
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
                return <div>{row.original.name}</div>;
            },
        }),
        columnHelper.accessor("quantity", {
            header: "Quantity",
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
                        {row.original.quantity} {row.original.unit}
                    </div>
                );
            },
        }),
        columnHelper.accessor("min_quantity", {
            header: "Min Quantity",
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
                        {row.original.min_quantity} {row.original.unit}
                    </div>
                );
            },
        }),
        columnHelper.display({
            id: "actions",
            cell: ({ row }) => {
                return (
                    <TableActions
                        id={row.original.id}
                        onEdit={() => {
                            if (onEdit) {
                                onEdit(row.original);
                            }
                        }}
                        onDelete={onDelete}
                    />
                );
            },
        }),
    ];
};
