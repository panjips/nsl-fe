import { createTypedColumnHelper } from "@/components/data-table/types";
import type { PurchaseWithInventory } from "../domain/purhcase";
import type { ColumnHelper } from "@tanstack/react-table";
import { TableActions } from "@/components/dropdown-table-action";
import { format } from "date-fns";

export const purchaseColumnHelper = createTypedColumnHelper<PurchaseWithInventory>();

export interface SetupPurchaseColumnsProps {
    columnHelper: ColumnHelper<PurchaseWithInventory>;
    onEdit?: (data: PurchaseWithInventory) => void;
    onDelete?: (id: string | number) => void;
}

export const setupPurchaseColumns = ({ columnHelper, onEdit, onDelete }: SetupPurchaseColumnsProps) => {
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
            header: "Inventory",
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
                return <div>{row.original.inventory?.name || "N/A"}</div>;
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
                        {row.original.quantity} {row.original.inventory?.unit || ""}
                    </div>
                );
            },
        }),
        columnHelper.accessor("total", {
            header: "Total",
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
                        {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }).format(Number(row.original.total))}
                    </div>
                );
            },
        }),
        columnHelper.accessor("purchase_date", {
            header: "Purchase Date",
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
                return <div>{format(new Date(row.original.purchase_date), "dd MMM yyyy")}</div>;
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
