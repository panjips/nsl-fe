import { createTypedColumnHelper } from "@/components/data-table/types";
import type { ProductRecipe } from "../domain/product-recipe";
import type { ColumnHelper } from "@tanstack/react-table";
import { TableActions } from "@/components/dropdown-table-action";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export const productRecipeColumnHelper = createTypedColumnHelper<ProductRecipe>();

export interface SetupProductRecipeColumnsProps {
    columnHelper: ColumnHelper<ProductRecipe>;
    onEdit?: (id: string | number, data: ProductRecipe) => void;
    onDelete?: (id: string | number) => void;
}

export const setupProductRecipeColumns = ({ columnHelper, onEdit, onDelete }: SetupProductRecipeColumnsProps) => {
    return [
        columnHelper.accessor("id", {
            header: "ID Product",
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
                // Extract original product ID from combined ID
                const originalId = row.original.id.toString().split("-")[0];
                return <div>{originalId}</div>;
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
            header: "Recipes",
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
                    <Popover>
                        <PopoverTrigger className="cursor-pointer text-primary underline">
                            {row.original.recipes.length}
                        </PopoverTrigger>
                        <PopoverContent className="text-sm space-y-1">
                            {row.original.recipes.map((recipe, index) => (
                                <p key={`${recipe.id}-${index}`}>
                                    {recipe.inventory?.name} - {recipe.quantity_used} {recipe.inventory?.unit}
                                </p>
                            ))}
                        </PopoverContent>
                    </Popover>
                );
            },
        }),
        columnHelper.accessor("sugar_type", {
            header: "Sugar Type",
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
                const sugarType = row.original.sugar_type;
                let type;

                if (sugarType === "LESS_SUGAR") {
                    type = "Less Sugar";
                } else if (sugarType === "NORMAL") {
                    type = "Normal";
                } else if (sugarType === "NO_SUGAR") {
                    type = "No Sugar";
                } else {
                    type = "Unknown";
                }

                return <Badge variant={"outline"}>{type}</Badge>;
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
                const originalId = row.original.id.toString().split("-")[0];
                return (
                    <div className="flex items-center justify-center">
                        <TableActions
                            id={originalId}
                            onEdit={() => onEdit?.(originalId, row.original)}
                            onDelete={() => onDelete?.(originalId)}
                        />
                    </div>
                );
            },
        }),
    ];
};
