import { createTypedColumnHelper } from "@/components/data-table/types";
import { ReservationStatus, type ReservationWithOrderCateringAndPackage } from "@/modules/feature-reservation";
import type { ColumnHelper } from "@tanstack/react-table";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Eye,
    Coffee,
    CheckCircle,
    Clock,
    XCircle,
    AlertCircle,
    Banknote,
    CircleDollarSign,
    CheckCircle2,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const cateringsColumnHelper = createTypedColumnHelper<ReservationWithOrderCateringAndPackage>();

export interface SetupCateringsColumnsProps {
    columnHelper: ColumnHelper<ReservationWithOrderCateringAndPackage>;
    onDetail?: (id: string | number, data?: ReservationWithOrderCateringAndPackage) => void;
}

export const statusIcons = {
    [ReservationStatus.PENDING]: <Clock className="h-3 w-3 fill-orange-500" />,
    [ReservationStatus.CONFIRMED]: <CheckCircle className="h-3 w-3 fill-yellow-500" />,
    [ReservationStatus.WAITING_DEPOSIT]: <AlertCircle className="h-3 w-3 fill-orange-500" />,
    [ReservationStatus.DEPOSIT_PAID]: <Banknote className="h-3 w-3 fill-green-500" />,
    [ReservationStatus.PAYMENT_PENDING]: <CircleDollarSign className="h-3 w-3 fill-orange-500" />,
    [ReservationStatus.COMPLETED]: <CheckCircle2 className="h-3 w-3 fill-green-500" />,
    [ReservationStatus.CANCELLED]: <XCircle className="h-3 w-3 fill-red-500" />,
};

export const setupCateringsColumns = ({ columnHelper, onDetail }: SetupCateringsColumnsProps) => {
    return [
        // ID Column
        columnHelper.accessor("id", {
            header: "ID",
            meta: {
                headColStyle: { textAlign: "left", fontWeight: "bold" },
                bodyColStyle: { textAlign: "left" },
            },
            cell: ({ row }) => <div>#{row.original.id}</div>,
        }),

        columnHelper.accessor("user.name", {
            header: "Customer",
            meta: {
                headColStyle: { textAlign: "left", fontWeight: "bold" },
                bodyColStyle: { textAlign: "left" },
            },
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5">
                    <span className="font-medium">{row.original.user?.name || "N/A"}</span>
                </div>
            ),
        }),

        columnHelper.accessor("event_date", {
            header: "Event Date",
            meta: {
                headColStyle: { textAlign: "left", fontWeight: "bold" },
                bodyColStyle: { textAlign: "left" },
            },
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5">
                    <span>{formatDateTime(row.original.event_date)}</span>
                </div>
            ),
        }),

        columnHelper.accessor("location", {
            header: "Location",
            meta: {
                headColStyle: { textAlign: "left", fontWeight: "bold" },
                bodyColStyle: { textAlign: "left" },
            },
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5 max-w-[200px] truncate" title={row.original.location || ""}>
                    <span className="truncate">{row.original.location}</span>
                </div>
            ),
        }),

        columnHelper.display({
            id: "packages",
            header: "Packages",
            meta: {
                headColStyle: { textAlign: "left", fontWeight: "bold" },
                bodyColStyle: { textAlign: "left" },
            },
            cell: ({ row }) => {
                const packages = row.original.orderCaterings || [];

                if (packages.length === 0) return <div>No packages</div>;

                if (packages.length === 1) {
                    return (
                        <div className="flex items-center gap-1.5">
                            <span>{packages[0].cateringPackage?.name || "Unknown package"}</span>
                        </div>
                    );
                }

                return (
                    <Popover>
                        <PopoverTrigger className="cursor-pointer text-primary underline">
                            <div className="flex items-center gap-1.5">
                                <Coffee className="h-3 w-3" />
                                <span>{packages.length} packages</span>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 text-sm space-y-1">
                            {packages.map((pkg, index) => (
                                <p key={index}>
                                    • {pkg.cateringPackage?.name || "Unknown package"}
                                    <span className="text-muted-foreground ml-1">({pkg.quantity_cup} cups)</span>
                                </p>
                            ))}
                        </PopoverContent>
                    </Popover>
                );
            },
        }),

        columnHelper.accessor("total_price", {
            header: "Total",
            meta: {
                headColStyle: { textAlign: "left", fontWeight: "bold" },
                bodyColStyle: { textAlign: "left" },
            },
            cell: ({ row }) => <div className="font-medium">{formatCurrency(row.original.total_price)}</div>,
        }),

        columnHelper.accessor("status", {
            header: "Status",
            meta: {
                headColStyle: { textAlign: "left", fontWeight: "bold" },
                bodyColStyle: { textAlign: "left" },
            },
            cell: ({ row }) => {
                const status = row.original.status || "PENDING";
                return (
                    <Badge variant="outline" className="flex items-center gap-1.5 px-2 py-0.5">
                        {statusIcons[status as keyof typeof statusIcons]}
                        <span>{status}</span>
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
