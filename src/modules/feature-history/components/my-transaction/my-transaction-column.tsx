import { createTypedColumnHelper } from "@/components/data-table/types";
import type { OnlineOrder } from "@/modules/feature-online-order";
import type { ColumnHelper } from "@tanstack/react-table";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { orderStatusDisplayNames, paymentStatusDisplayNames } from "../../domain";
import { orderStatusIcons, paymentStatusIcons } from "../shared";

export const myTransactionColumnHelper = createTypedColumnHelper<OnlineOrder>();

export interface SetupMyTransactionColumnsProps {
    columnHelper: ColumnHelper<OnlineOrder>;
    onDetail?: (id: string | number, data?: OnlineOrder) => void;
}

export const setupMyTransactionColumns = ({ columnHelper, onDetail }: SetupMyTransactionColumnsProps) => {
    return [
        columnHelper.accessor("id", {
            header: "Order ID",
            meta: {
                headColStyle: { textAlign: "left", fontWeight: "bold" },
                bodyColStyle: { textAlign: "left" },
            },
            cell: ({ row }) => <div>{row.original.id}</div>,
        }),

        columnHelper.accessor("order_date", {
            header: "Date",
            meta: {
                headColStyle: { textAlign: "left", fontWeight: "bold" },
                bodyColStyle: { textAlign: "left" },
            },
            cell: ({ row }) => <div>{formatDateTime(row.original.order_date)}</div>,
        }),

        columnHelper.display({
            header: "Items",
            meta: {
                headColStyle: { textAlign: "left", fontWeight: "bold" },
                bodyColStyle: { textAlign: "left" },
            },
            cell: ({ row }) => {
                return (
                    <Popover>
                        <PopoverTrigger className="cursor-pointer text-primary underline">
                            {row.original.items.reduce((total, item) => total + Number(item.quantity), 0)} items
                        </PopoverTrigger>
                        <PopoverContent className="w-64 text-sm space-y-1">
                            {getOrderSummary(row.original).map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </PopoverContent>
                    </Popover>
                );
            },
        }),

        columnHelper.accessor("total_amount", {
            header: "Amount",
            meta: {
                headColStyle: { textAlign: "left", fontWeight: "bold" },
                bodyColStyle: { textAlign: "left" },
            },
            cell: ({ row }) => <div>{formatCurrency(row.original.total_amount)}</div>,
        }),

        columnHelper.accessor("order_status", {
            header: "Status",
            meta: {
                headColStyle: { textAlign: "left", fontWeight: "bold" },
                bodyColStyle: { textAlign: "left" },
            },
            cell: ({ row }) => {
                const status = row.original.order_status;
                return (
                    <Badge variant={"outline"} className="flex items-center gap-1.5 px-2 py-0.5">
                        {orderStatusIcons[status as keyof typeof orderStatusIcons]}
                        <span>{orderStatusDisplayNames[status as keyof typeof orderStatusDisplayNames] || status}</span>
                    </Badge>
                );
            },
        }),

        columnHelper.accessor("payment.trx_status", {
            header: "Payment",
            meta: {
                headColStyle: { textAlign: "left", fontWeight: "bold" },
                bodyColStyle: { textAlign: "left" },
            },
            cell: ({ row }) => {
                const status = row.original.payment?.trx_status;
                return (
                    <Badge variant={"outline"} className="flex items-center gap-1.5 px-2 py-0.5">
                        {paymentStatusIcons[status as keyof typeof paymentStatusIcons]}
                        <span>
                            {paymentStatusDisplayNames[status as keyof typeof paymentStatusDisplayNames] || status}
                        </span>
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

function getOrderSummary(order: OnlineOrder): string[] {
    const summary: string[] = [];

    order.items.forEach((item) => {
        summary.push(`${item.product.name} x ${item.quantity}`);

        item.addons?.forEach((addon) => {
            summary.push(` - ${addon.addon.name} x ${addon.quantity}`);
        });
    });

    return summary;
}
