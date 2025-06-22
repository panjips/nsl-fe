import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import type { RevenueReport } from "../../domain/revenue";

interface RevenueTableProps {
    data: RevenueReport | null;
    isLoading?: boolean;
}

export function RevenueTable({ data, isLoading = false }: RevenueTableProps) {
    const formatCurrency = (value: number | string) => {
        const num = typeof value === "string" ? parseFloat(value) : value;
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(num);
    };

    return (
        <>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Revenue Details
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/3">Name</TableHead>
                                <TableHead className="w-1/3">Amount</TableHead>
                                <TableHead className="w-1/3 text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-24 text-center">
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : !data ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-24 text-center">
                                        No revenue data
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <>
                                    <TableRow>
                                        <TableCell className="font-medium">Orders (Product + Addon)</TableCell>
                                        <TableCell>{data.orders.count}</TableCell>
                                        <TableCell className="text-right">
                                            {formatCurrency(data.orders.total)}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Reservations</TableCell>
                                        <TableCell>{data.reservations.count}</TableCell>
                                        <TableCell className="text-right">
                                            {formatCurrency(data.reservations.total)}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="bg-muted/50">
                                        <TableCell className="font-bold">Total Revenue</TableCell>
                                        <TableCell />
                                        <TableCell className="text-right font-bold">
                                            {formatCurrency(data.totalRevenue)}
                                        </TableCell>
                                    </TableRow>
                                </>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </>
    );
}
