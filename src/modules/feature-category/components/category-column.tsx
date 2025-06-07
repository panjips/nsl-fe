import { createTypedColumnHelper } from "@/components/data-table/types";
import type { Category } from "../domain";
import type { ColumnHelper } from "@tanstack/react-table";
import { TableActions } from "@/components/dropdown-table-action";

export const categoryColumnHelper = createTypedColumnHelper<Category>();

export interface SetupCategoryColumnsProps {
    columnHelper: ColumnHelper<Category>;
    onEdit?: (data: Category) => void;
    onDelete?: (id: string | number) => void;
}

export const setupCategoryColumns = ({ columnHelper, onEdit, onDelete }: SetupCategoryColumnsProps) => {
    return [
        columnHelper.accessor("id", {
            header: "ID Category",
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
