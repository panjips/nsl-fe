import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import type { InventoryPurchaseReport } from "../../domain/inventory";

interface InventoryPurchaseTableProps {
    data: InventoryPurchaseReport[];
    isLoading?: boolean;
}

export function InventoryPurchaseTable({ data, isLoading = false }: InventoryPurchaseTableProps) {
    return (
        <>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Inventory Purchase Details
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Item</TableHead>
                                <TableHead>Unit</TableHead>
                                <TableHead className="text-right">Quantity Purchased</TableHead>
                                <TableHead className="text-right">Total Cost</TableHead>
                                <TableHead className="text-right">Current Stock</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        No inventory purchase data
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell>{item.unit}</TableCell>
                                        <TableCell className="text-right">
                                            {item.total_quantity_purchased} {item.unit}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            Rp {new Intl.NumberFormat("id-ID").format(item.total_cost)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {item.current_stock} {item.unit}
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
