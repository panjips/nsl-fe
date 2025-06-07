import { createTypedColumnHelper } from "@/components/data-table/types";
import type { TableProduct } from "../domain";
import type { ColumnHelper } from "@tanstack/react-table";
import { TableActions } from "@/components/dropdown-table-action";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { formatCurrency, getInitials } from "@/lib/utils";

export const productColumnHelper = createTypedColumnHelper<TableProduct>();

export interface SetupProductColumns {
    columnHelper: ColumnHelper<TableProduct>;
    onEdit?: (id: string | number) => void;
    onDelete?: (id: string | number) => void;
}

export const setupProductColumns = ({ columnHelper, onEdit, onDelete }: SetupProductColumns) => {
    return [
        columnHelper.accessor("image_url", {
            header: "Product Image",
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
                const name = getInitials(row.original.name);

                return (
                    <Avatar className="w-24 h-24 rounded-lg">
                        <AvatarImage
                            className="w-24 h-24 rounded-lg object-cover object-center"
                            src={row.original.image_url}
                            alt={row.original.name}
                        />
                        <AvatarFallback className="text-lg flex items-center justify-center w-24 h-24  rounded-lg">
                            {name}
                        </AvatarFallback>
                    </Avatar>
                );
            },
        }),
        columnHelper.accessor("id", {
            header: "ID Product",
            meta: {
                headColStyle: {
                    textAlign: "left",
                    fontWeight: "bold",
                },
                bodyColStyle: {
                    textAlign: "center",
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
        columnHelper.accessor("category.name", {
            header: "Category",
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
                return <div>{row.original.category.name}</div>;
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
                const cost = formatCurrency(row.original.cost);
                return <div>{cost}</div>;
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
                const price = formatCurrency(row.original.price);
                return <div>{price}</div>;
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
                return (
                    <div className="flex items-center h-full w-64">
                        <div
                            className="max-h-24 w-full overflow-y-auto overflow-x-hidden pr-2"
                            style={{
                                scrollbarWidth: "thin",
                                scrollbarColor: "#CBD5E0 #EDF2F7",
                            }}
                        >
                            <p className="break-words whitespace-pre-wrap">{row.original.description}</p>
                        </div>
                    </div>
                );
            },
        }),
        columnHelper.display({
            id: "actions",
            cell: ({ row }) => {
                return <TableActions id={row.original.id} onEdit={onEdit} onDelete={onDelete} />;
            },
        }),
    ];
};
