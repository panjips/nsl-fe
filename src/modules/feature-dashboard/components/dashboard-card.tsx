import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { PelangganStatistik } from "../domain";
import { formatCurrency } from "@/lib/utils";
import { useGlobalAuthStore } from "@/stores";

export interface DashboardCardProps {
    data: PelangganStatistik[];
    selectedPeriod: "7days" | "30days";
    setSelectedPeriod: (period: "7days" | "30days") => void;
}

export const DashboardCard = ({ data, selectedPeriod }: DashboardCardProps) => {
    const totalOrders = data.reduce((sum, item) => sum + item.qty_order, 0);
    const totalSpend = data.reduce((sum, item) => sum + item.total_amount, 0);

    let totalCost = 0;
    if (data.length > 0) {
        totalCost = data.reduce((sum, item) => sum + (item.total_cost || 0), 0);
    }

    const { user } = useGlobalAuthStore();

    const days = Number(selectedPeriod.match(/\d+/)?.[0]);
    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Orders</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {totalOrders}
                    </CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">Orders for the last {days} days</div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>{user?.role !== "Pelanggan" ? "Order Revenue" : "Total Spending"}</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {formatCurrency(totalSpend)}
                    </CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">Orders for the last {days} days</div>
                </CardFooter>
            </Card>
            {user?.role !== "Pelanggan" && (
                <>
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>Order Cost</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                {formatCurrency(totalCost)}
                            </CardTitle>
                        </CardHeader>
                        <CardFooter className="flex-col items-start text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">Orders for the last {days} days</div>
                        </CardFooter>
                    </Card>
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>Order Gross Profit</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                {formatCurrency(totalSpend - totalCost)}
                            </CardTitle>
                        </CardHeader>
                        <CardFooter className="flex-col items-start text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">Orders for the last {days} days</div>
                        </CardFooter>
                    </Card>
                </>
            )}
        </div>
    );
};
