import { createTypedColumnHelper } from "@/components/data-table/types";
import type { AddonRecipe } from "../domain/addon-recipe";
import type { ColumnHelper } from "@tanstack/react-table";
import { TableActions } from "@/components/dropdown-table-action";

export const addonRecipeColumnHelper = createTypedColumnHelper<AddonRecipe>();

export interface SetupAddonRecipeColumnsProps {
    columnHelper: ColumnHelper<AddonRecipe>;
    onEdit?: (id: string | number, data: AddonRecipe) => void;
    onDelete?: (id: string | number) => void;
}

export const setupAddonRecipeColumns = ({ columnHelper, onEdit, onDelete }: SetupAddonRecipeColumnsProps) => {
    return [
        columnHelper.accessor("id", {
            header: "ID Addon",
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
        columnHelper.accessor("recipes", {
            header: "Recipes Count",
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
                return <div>{row.original.recipes.length}</div>;
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
