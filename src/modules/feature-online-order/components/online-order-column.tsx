import { createTypedColumnHelper } from "@/components/data-table/types";
import type { OnlineOrder } from "../domain";
import type { ColumnHelper } from "@tanstack/react-table";
import { TableActions } from "@/components/dropdown-table-action";
import { formatCurrency } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock } from "lucide-react";

export const onlineOrderColumnHelper = createTypedColumnHelper<OnlineOrder>();

export interface SetupOnlineOrderColumnsProps {
    columnHelper: ColumnHelper<OnlineOrder>;
    onDetail?: (id: string | number, data?: OnlineOrder) => void;
    onUpdateStatus?: (id: string | number, data?: OnlineOrder) => void;
}

export const setupOnlineOrderColumns = ({ columnHelper, onDetail, onUpdateStatus }: SetupOnlineOrderColumnsProps) => {
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
        columnHelper.accessor("user.name", {
            header: "Cust. Name",
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
                return <div>{row.original.user?.name}</div>;
            },
        }),
        columnHelper.accessor("user.phone_number", {
            header: "Cust. Phone",
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
                return <div>{row.original.user?.phone_number}</div>;
            },
        }),
        columnHelper.accessor("total_amount", {
            header: "Total Payment",
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
                return <div>{formatCurrency(row.original.total_amount)}</div>;
            },
        }),
        columnHelper.display({
            header: "Total Items",
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
                            {row.original.items.reduce((total, item) => Number(total) + Number(item.quantity), 0)}
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
        columnHelper.accessor("order_status", {
            header: "Order Status",
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
                const status = row.original.order_status;
                return (
                    <Badge variant={"outline"} className="flex items-center gap-1.5 px-2 py-0.5">
                        <Clock className="fill-yellow-500 dark:fill-yellow-400" />
                        <span>{status}</span>
                    </Badge>
                );
            },
        }),

        columnHelper.accessor("payment.trx_status", {
            header: "Payment Status",
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
                const status = row.original.payment?.trx_status;
                return (
                    <Badge variant={"outline"} className="flex items-center gap-1.5 px-2 py-0.5">
                        <CheckCircle2 className="fill-green-500 dark:fill-green-400" />
                        <span>{status}</span>
                    </Badge>
                );
            },
        }),
        columnHelper.display({
            id: "actions",
            cell: ({ row }) => {
                return (
                    <TableActions
                        id={row.original.id}
                        onDetail={() => {
                            if (onDetail) {
                                onDetail(row.original.id, row.original);
                            }
                        }}
                        onEdit={() => {
                            if (onUpdateStatus) {
                                onUpdateStatus(row.original.id, row.original);
                            }
                        }}
                    />
                );
            },
        }),
    ];
};

function getOrderSummary(order: OnlineOrder): string[] {
    const summary: string[] = [];

    order.items.forEach((item) => {
        summary.push(`[${item.selected_sugar_type}] ${item.product.name} x ${item.quantity}`);

        item.addons?.forEach((addon) => {
            summary.push(` - ${addon.addon.name} x ${addon.quantity}`);
        });
    });

    return summary;
}
