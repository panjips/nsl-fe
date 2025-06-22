import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle, XCircle } from "lucide-react";
import type { ReservationReport } from "../../domain/reservation";
import { format } from "date-fns";

interface ReservationCateringTableProps {
    data: ReservationReport[];
    isLoading?: boolean;
}

export function ReservationCateringTable({ data, isLoading = false }: ReservationCateringTableProps) {
    const formatCurrency = (value: number | string) => {
        const num = typeof value === "string" ? parseFloat(value) : value;
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(num);
    };

    const formatDate = (date: Date) => {
        return format(new Date(date), "dd-MM-yyyy");
    };

    return (
        <>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Reservation Catering Details
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Total Package</TableHead>
                                <TableHead>Catering Packages</TableHead>
                                <TableHead>Using Cart</TableHead>
                                <TableHead className="text-right">Total Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        No reservation catering data
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{formatDate(item.event_date)}</TableCell>
                                        <TableCell>{item.package_count}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                {item.orderCaterings?.map((pkg, pkgIdx) => (
                                                    <div key={pkgIdx} className="text-sm">
                                                        x{pkg.quantity} {pkg.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                {item.is_use_cart ? (
                                                    <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                                                ) : (
                                                    <XCircle className="w-4 h-4 text-red-500 mr-1" />
                                                )}
                                                {item.is_use_cart ? "Yes" : "No"}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right font-medium">
                                            {formatCurrency(item.total_price)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </>
    );
}
