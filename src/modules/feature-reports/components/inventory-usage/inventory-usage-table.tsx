import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import type { InventoryUsageReport } from "../../domain/inventory";

interface InventoryUsageTableProps {
    data: InventoryUsageReport[];
    isLoading?: boolean;
}

export function InventoryUsageTable({ data, isLoading = false }: InventoryUsageTableProps) {
    return (
        <>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Inventory Usage Details
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
                                <TableHead className="text-right">Usage</TableHead>
                                <TableHead className="text-right">Current Stock</TableHead>
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
                                        No inventory usage data
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell>{item.unit}</TableCell>
                                        <TableCell className="text-right">
                                            {item.total_quantity_used} {item.unit}
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
