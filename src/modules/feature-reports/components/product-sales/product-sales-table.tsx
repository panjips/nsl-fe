import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee } from "lucide-react";
import { calculateTotal } from "./helpers";
import type { Product } from "../../domain";
import { formatCurrency } from "@/lib/utils";

interface ProductSalesTableProps {
    products: Product[];
    isLoading?: boolean;
}

export function ProductSalesTable({ products, isLoading = false }: ProductSalesTableProps) {
    const totalAmount = calculateTotal(products);

    return (
        <>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Coffee className="w-5 h-5" />
                    Product Sales Details
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Product Name</TableHead>
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
                            ) : products.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="h-24 text-center">
                                        No product sales data
                                    </TableCell>
                                </TableRow>
                            ) : (
                                products.map((product, index) => (
                                    <TableRow key={product.product_id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{product.product_name}</TableCell>
                                        <TableCell className="text-right">{product.quantity}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(product.cost)}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(product.total)}</TableCell>
                                        <TableCell className="text-right">
                                            {formatCurrency(product.total_cost)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {formatCurrency(product.gross_profit)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                            <TableRow className="font-medium">
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
