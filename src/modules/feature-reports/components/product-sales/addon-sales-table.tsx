import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { calculateTotal } from "./helpers";
import type { Addon } from "../../domain";
import { formatCurrency } from "@/lib/utils";

interface AddonSalesTableProps {
    addons: Addon[];
    isLoading?: boolean;
}

export function AddonSalesTable({ addons, isLoading = false }: AddonSalesTableProps) {
    const totalAmount = calculateTotal(addons);

    return (
        <>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Addon Sales Details
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Addon Name</TableHead>
                                <TableHead className="text-right">Quantity</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="text-right">Cost</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead className="text-right">Total Cost</TableHead>
                                <TableHead className="text-right">Gross Profit</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="h-24 text-center">
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : addons.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="h-24 text-center">
                                        No addon sales data
                                    </TableCell>
                                </TableRow>
                            ) : (
                                addons.map((addon, index) => (
                                    <TableRow key={addon.addon_id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{addon.addon_name}</TableCell>
                                        <TableCell className="text-right">{addon.quantity}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(addon.price)}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(addon.cost)}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(addon.total)}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(addon.total_cost)}</TableCell>
                                        <TableCell className="text-right">
                                            {formatCurrency(addon.gross_profit)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                            <TableRow className="border-t-2 font-medium">
                                <TableCell colSpan={7} className="text-right">
                                    Total
                                </TableCell>
                                <TableCell className="text-right">{formatCurrency(totalAmount)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </>
    );
}
