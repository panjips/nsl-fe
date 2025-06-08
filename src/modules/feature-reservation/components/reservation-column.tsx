import { createTypedColumnHelper } from "@/components/data-table/types";
import type { ReservationWithOrderCateringAndPackage } from "../domain";
import type { ColumnHelper } from "@tanstack/react-table";
import { TableActions } from "@/components/dropdown-table-action";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const reservationColumnHelper = createTypedColumnHelper<ReservationWithOrderCateringAndPackage>();

export interface SetupReservationColumnsProps {
    columnHelper: ColumnHelper<ReservationWithOrderCateringAndPackage>;
    onEdit?: (data: ReservationWithOrderCateringAndPackage) => void;
    onDelete?: (id: string | number, data: ReservationWithOrderCateringAndPackage) => void;
    onView?: (id: string | number) => void;
    onStatusUpdate?: (id: string | number, data: ReservationWithOrderCateringAndPackage) => void;
    isAdminView?: boolean;
}

export const setupReservationColumns = ({
    columnHelper,
    onEdit,
    onDelete,
    onView,
    onStatusUpdate,
    isAdminView = false,
}: SetupReservationColumnsProps) => {
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
            header: "Client Name",
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
        columnHelper.accessor("location", {
            header: "Location",
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
                return <div>{row.original.location}</div>;
            },
        }),
        columnHelper.accessor("event_date", {
            header: "Event Date",
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
                try {
                    const formattedDate = format(new Date(row.original.event_date), "PPP");
                    return <div>{formattedDate}</div>;
                } catch (e) {
                    return <div>{row.original.event_date}</div>;
                }
            },
        }),
        columnHelper.accessor("status", {
            header: "Status",
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
                const status = row.original.status;
                let variant = "default";

                if (status === "PENDING") variant = "outline";
                if (status === "CONFIRMED") variant = "secondary";
                if (status === "COMPLETED") variant = "default";
                if (status === "CANCELLED") variant = "destructive";

                return (
                    <Badge variant={variant as any} className="capitalize">
                        {status}
                    </Badge>
                );
            },
        }),
        columnHelper.accessor("total_price", {
            header: "Total Price",
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
                        }).format(row.original.total_price)}
                    </div>
                );
            },
        }),
        columnHelper.accessor("is_use_cart", {
            header: "Using Cart",
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
                return <div>{row.original.is_use_cart ? "Yes" : "No"}</div>;
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
                return (
                    <div className="flex items-center justify-center">
                        <TableActions
                            id={row.original.id}
                            onDetail={() => {
                                if (onView) {
                                    onView(row.original.id);
                                }
                            }}
                            onEdit={() => {
                                if (onEdit) {
                                    onEdit(row.original);
                                }
                            }}
                            onDelete={(id) => {
                                if (onDelete) {
                                    onDelete(id, row.original);
                                }
                            }}
                            customActions={
                                isAdminView
                                    ? [
                                          {
                                              label: "Update Status",
                                              onClick: (id) => {
                                                  if (onStatusUpdate) {
                                                      onStatusUpdate(id, row.original);
                                                  }
                                              },
                                          },
                                      ]
                                    : []
                            }
                        />
                    </div>
                );
            },
        }),
    ];
};
