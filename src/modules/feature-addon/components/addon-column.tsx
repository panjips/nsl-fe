import { createTypedColumnHelper } from "@/components/data-table/types";
import type { Addon } from "../domain";
import type { ColumnHelper } from "@tanstack/react-table";
import { TableActions } from "@/components/dropdown-table-action";

export const addonColumnHelper = createTypedColumnHelper<Addon>();

export interface SetupAddonColumnsProps {
    columnHelper: ColumnHelper<Addon>;
    onEdit?: (data: Addon) => void;
    onDelete?: (id: string | number) => void;
}

export const setupAddonColumns = ({ columnHelper, onEdit, onDelete }: SetupAddonColumnsProps) => {
    return [
        columnHelper.accessor("id", {
            header: "ID Add-on",
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
                return <div>{row.original.description}</div>;
            },
        }),
        columnHelper.accessor("cost", {
            header: "Cost",
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
                        }).format(row.original.cost)}
                    </div>
                );
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
                return (
                    <div>
                        {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }).format(row.original.price)}
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
