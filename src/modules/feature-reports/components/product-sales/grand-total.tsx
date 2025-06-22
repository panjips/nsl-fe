import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Addon, Product } from "../../domain";
import { formatCurrency } from "@/lib/utils";

interface GrandTotalProps {
    productSales: Product[];
    addonSales: Addon[];
}

export function GrandTotal({ productSales, addonSales }: GrandTotalProps) {
    const totalProductSales = productSales.reduce(
        (sum, product) => sum + parseFloat(product.total.replace(/[^0-9.-]+/g, "")),
        0,
    );

    const totalProductGrossProfit = productSales.reduce(
        (sum, product) => sum + parseFloat(product.gross_profit.replace(/[^0-9.-]+/g, "")),
        0,
    );

    const totalAddonSales = addonSales.reduce(
        (sum, addon) => sum + parseFloat(addon.total.replace(/[^0-9.-]+/g, "")),
        0,
    );

    const totalAddonGrossProfit = addonSales.reduce(
        (sum, addon) => sum + parseFloat(addon.gross_profit.replace(/[^0-9.-]+/g, "")),
        0,
    );

    const grandTotal = totalProductSales + totalAddonSales;
    const grandTotalGrossProfit = totalProductGrossProfit + totalAddonGrossProfit;

    return (
        <Card className="gap-2">
            <CardHeader>
                <h2 className="text-xl font-semibold">Grand Total Summary</h2>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Total Sales</span>
                    <span className="text-xl font-bold">{formatCurrency(grandTotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Total Gross Profit</span>
                    <span className="text-xl font-bold">{formatCurrency(grandTotalGrossProfit)}</span>
                </div>
            </CardContent>
        </Card>
    );
}
