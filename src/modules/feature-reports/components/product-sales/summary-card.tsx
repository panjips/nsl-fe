import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Addon, Product } from "../../domain";
import { formatCurrency } from "@/lib/utils";

interface SummaryCardsProps {
    productSales: Product[];
    addonSales: Addon[];
}

export function SummaryCards({ productSales, addonSales }: SummaryCardsProps) {
    const totalProductSales = productSales.reduce(
        (sum, product) => sum + parseFloat(product.total.replace(/[^0-9.-]+/g, "")),
        0,
    );

    const totalAddonSales = addonSales.reduce(
        (sum, addon) => sum + parseFloat(addon.total.replace(/[^0-9.-]+/g, "")),
        0,
    );

    const totalSales = totalProductSales + totalAddonSales;
    const totalItems = productSales.reduce((sum, item) => sum + item.quantity, 0);
    const totalAddons = addonSales.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(totalSales)}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Product Sales</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(totalProductSales)}</div>
                    <p className="text-xs text-muted-foreground">{totalItems} items sold</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Addon Sales</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(totalAddonSales)}</div>
                    <p className="text-xs text-muted-foreground">{totalAddons} items sold</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Sale per Product</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {formatCurrency(totalItems > 0 ? totalSales / totalItems : 0)}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
