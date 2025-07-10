import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { DateFilterPeriod, PelangganStatistik } from "../domain";
import { formatCurrency } from "@/lib/utils";
import { useGlobalAuthStore } from "@/stores";
import { useDashboardStore } from "../stores";
import { format } from "date-fns";

export interface DashboardCardProps {
    data: PelangganStatistik[];
    selectedPeriod: DateFilterPeriod;
    setSelectedPeriod: (period: DateFilterPeriod) => void;
}

export const DashboardCard = ({ data, selectedPeriod }: DashboardCardProps) => {
    const totalOrders = data.reduce((sum, item) => sum + item.qty_order, 0);
    const totalSpend = data.reduce((sum, item) => sum + item.total_amount, 0);

    let totalCost = 0;
    if (data.length > 0) {
        totalCost = data.reduce((sum, item) => sum + (item.total_cost || 0), 0);
    }

    const { dateRange } = useDashboardStore();

    const { user } = useGlobalAuthStore();

    const days = Number(selectedPeriod.match(/\d+/)?.[0]);

    function getOrderOrPurchaseString(role: string, days: number): string {
        if (role !== "Staf") {
            if (selectedPeriod === "custom") {
                // Add validation to ensure dates are valid before formatting
                let dateRangeText = "";
                try {
                    // Make sure we have valid dates before formatting
                    if (dateRange.startDate && dateRange.endDate) {
                        const startDateObj = new Date(dateRange.startDate);
                        const endDateObj = new Date(dateRange.endDate);

                        // Check if dates are valid
                        if (!isNaN(startDateObj.getTime()) && !isNaN(endDateObj.getTime())) {
                            const startDate = format(startDateObj, "dd MMM yyyy");
                            const endDate = format(endDateObj, "dd MMM yyyy");
                            dateRangeText = `${startDate} to ${endDate}`;
                        } else {
                            dateRangeText = "custom period";
                        }
                    } else {
                        dateRangeText = "custom period";
                    }
                } catch (error) {
                    console.error("Error formatting dates:", error);
                    dateRangeText = "custom period";
                }

                return `Orders for ${dateRangeText}`;
            }
            return `Orders for the last ${days || 0} days`;
        } else {
            if (selectedPeriod === "custom") {
                // Add the same validation for staff view
                let dateRangeText = "";
                try {
                    if (dateRange.startDate && dateRange.endDate) {
                        const startDateObj = new Date(dateRange.startDate);
                        const endDateObj = new Date(dateRange.endDate);

                        if (!isNaN(startDateObj.getTime()) && !isNaN(endDateObj.getTime())) {
                            const startDate = format(startDateObj, "dd MMM yyyy");
                            const endDate = format(endDateObj, "dd MMM yyyy");
                            dateRangeText = `${startDate} to ${endDate}`;
                        } else {
                            dateRangeText = "custom period";
                        }
                    } else {
                        dateRangeText = "custom period";
                    }
                } catch (error) {
                    console.error("Error formatting dates:", error);
                    dateRangeText = "custom period";
                }

                return `Purchases for ${dateRangeText}`;
            }
            return `Purchases for the last ${days || 0} days`;
        }
    }

    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>{user?.role !== "Staf" ? "Total Orders" : "Purchases Quantity"}</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {totalOrders}
                    </CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        {getOrderOrPurchaseString(user?.role || "", days)}
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>
                        {user?.role !== "Pelanggan"
                            ? user?.role !== "Staf"
                                ? "Order Revenue"
                                : "Total Purchases"
                            : "Total Spending"}
                    </CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {formatCurrency(totalSpend)}
                    </CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        {getOrderOrPurchaseString(user?.role || "", days)}
                    </div>
                </CardFooter>
            </Card>
            {user?.role !== "Pelanggan" && user?.role !== "Staf" && (
                <>
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>Order Cost</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                {formatCurrency(totalCost)}
                            </CardTitle>
                        </CardHeader>
                        <CardFooter className="flex-col items-start text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">{getOrderOrPurchaseString(user?.role || "", days)}</div>
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
                            <div className="line-clamp-1 flex gap-2 font-medium">{getOrderOrPurchaseString(user?.role || "", days)}</div>
                        </CardFooter>
                    </Card>
                </>
            )}
        </div>
    );
};
