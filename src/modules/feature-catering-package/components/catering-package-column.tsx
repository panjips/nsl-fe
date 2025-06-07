import { createTypedColumnHelper } from "@/components/data-table/types";
import type { CateringPackage } from "../domain";
import type { ColumnHelper } from "@tanstack/react-table";
import { TableActions } from "@/components/dropdown-table-action";
import { formatCurrency } from "@/lib/utils";

export const cateringPackageColumnHelper = createTypedColumnHelper<CateringPackage>();

export interface SetupCateringPackageColumnsProps {
    columnHelper: ColumnHelper<CateringPackage>;
    onEdit?: (id: string | number, data: CateringPackage) => void;
    onDelete?: (id: string | number) => void;
}

export const setupCateringPackageColumns = ({ columnHelper, onEdit, onDelete }: SetupCateringPackageColumnsProps) => {
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
        columnHelper.accessor("description", {
            header: "Description",
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
                return <div>{row.original.description || "-"}</div>;
            },
        }),
        columnHelper.accessor("price", {
            header: "Price",
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
                return <div>{formatCurrency(row.original.price)}</div>;
            },
        }),
        columnHelper.accessor("quantity_cup", {
            header: "Quantity Cup",
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
                return <div>{row.original.quantity_cup}</div>;
            },
        }),
        columnHelper.accessor("size_volume", {
            header: "Size Volume",
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
                return <div>{`${row.original.size_volume} ${row.original.size_unit}`}</div>;
            },
        }),
        columnHelper.display({
            id: "actions",
            header: "Actions",
            meta: {
                headColStyle: {
                    textAlign: "center",
                    fontWeight: "bold",
                },
                bodyColStyle: {
                    textAlign: "center",
                },
            },
            cell: ({ row }) => {
                const { id } = row.original;
                return (
                    <div className="flex items-center justify-center">
                        <TableActions
                            id={id}
                            onEdit={() => onEdit?.(id, row.original)}
                            onDelete={() => onDelete?.(id)}
                        />
                    </div>
                );
            },
        }),
    ];
};
