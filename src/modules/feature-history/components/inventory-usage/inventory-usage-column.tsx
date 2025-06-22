import { createTypedColumnHelper } from "@/components/data-table/types";
import type { OrderInventoryUsage } from "../../domain";
import type { ColumnHelper } from "@tanstack/react-table";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { orderStatusDisplayNames } from "../../domain";
import { orderStatusIcons } from "../shared";

export const inventoryUsageColumnHelper = createTypedColumnHelper<OrderInventoryUsage>();

export interface SetupInventoryUsageColumnsProps {
    columnHelper: ColumnHelper<OrderInventoryUsage>;
    onDetail?: (id: string | number, data?: OrderInventoryUsage) => void;
}

export const setupInventoryUsageColumns = ({ columnHelper, onDetail }: SetupInventoryUsageColumnsProps) => {
    return [
        columnHelper.accessor("id", {
            header: "Usage ID",
            meta: {
                headColStyle: { textAlign: "left", fontWeight: "bold" },
                bodyColStyle: { textAlign: "left" },
            },
            cell: ({ row }) => <div>#{row.original.id}</div>,
        }),

        columnHelper.accessor("inventory.name", {
            header: "Inventory Item",
            meta: {
                headColStyle: { textAlign: "left", fontWeight: "bold" },
                bodyColStyle: { textAlign: "left" },
            },
            cell: ({ row }) => <div className="font-medium">{row.original.inventory?.name || "N/A"}</div>,
        }),

        columnHelper.display({
            id: "quantity_used_with_unit",
            header: "Quantity Used",
            meta: {
                headColStyle: { textAlign: "left", fontWeight: "bold" },
                bodyColStyle: { textAlign: "left" },
            },
            cell: ({ row }) => {
                return (
                    <div>
                        {row.original.quantity_used} {row.original.inventory?.unit || "units"}
                    </div>
                );
            },
        }),

        columnHelper.accessor("order.order_date", {
            header: "Date",
            meta: {
                headColStyle: { textAlign: "left", fontWeight: "bold" },
                bodyColStyle: { textAlign: "left" },
            },
            cell: ({ row }) => <div>{formatDateTime(row.original.order?.order_date)}</div>,
        }),

        columnHelper.accessor("order.order_type", {
            header: "Order Type",
            meta: {
                headColStyle: { textAlign: "left", fontWeight: "bold" },
                bodyColStyle: { textAlign: "left" },
            },
            cell: ({ row }) => {
                const orderType = row.original.order?.order_type || "N/A";
                return (
                    <Badge variant={orderType === "ONLINE" ? "secondary" : "default"} className="px-2 py-0.5">
                        {orderType}
                    </Badge>
                );
            },
        }),

        columnHelper.accessor("order.order_status", {
            header: "Order Status",
            meta: {
                headColStyle: { textAlign: "left", fontWeight: "bold" },
                bodyColStyle: { textAlign: "left" },
            },
            cell: ({ row }) => {
                const status = row.original.order?.order_status || "PENDING";
                return (
                    <Badge variant={"outline"} className="flex items-center gap-1.5 px-2 py-0.5">
                        {orderStatusIcons[status as keyof typeof orderStatusIcons]}
                        <span>{orderStatusDisplayNames[status as keyof typeof orderStatusDisplayNames] || status}</span>
                    </Badge>
                );
            },
        }),

        columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                return (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            if (onDetail) {
                                onDetail(row.original.id, row.original);
                            }
                        }}
                    >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                    </Button>
                );
            },
        }),
    ];
};
