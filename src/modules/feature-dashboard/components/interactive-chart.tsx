import { useState, useEffect, useRef } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import type { PelangganStatistik, DateFilterPeriod } from "../domain";
import { formatCurrency } from "@/lib/utils";
import { DateRangeModal } from "./dashboard-date-range-modal";
import { useDashboardStore } from "../stores";
import { useGlobalAuthStore } from "@/stores";

export interface InteractiveChartProps {
    data: PelangganStatistik[];
    selectedPeriod: DateFilterPeriod;
    setSelectedPeriod: (period: DateFilterPeriod) => void;
}

export const InteractiveChart = ({ data, selectedPeriod, setSelectedPeriod }: InteractiveChartProps) => {
    const [isDateRangeModalOpen, setIsDateRangeModalOpen] = useState(false);
    const { dateRange, setDateRange, statistics } = useDashboardStore();
    const { user } = useGlobalAuthStore();

    // Add a state to track if the screen is smaller than lg breakpoint
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Check screen size on mount and when window resizes
    useEffect(() => {
        const checkScreenSize = () => {
            // lg breakpoint is typically 1024px
            setIsSmallScreen(window.innerWidth < 1024);
        };

        // Initial check
        checkScreenSize();

        // Add event listener for resize
        window.addEventListener("resize", checkScreenSize);

        // Cleanup
        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    const handleApplyDateRange = (range: { startDate: string | null; endDate: string | null }) => {
        if (range.startDate && range.endDate) {
            setDateRange(range);
            // Refetch data with the new date range
            statistics.getStatistics({
                startDate: range.startDate,
                endDate: range.endDate,
            });
        }
    };

    const getDateRangeLabel = () => {
        if (dateRange.startDate && dateRange.endDate) {
            const start = new Date(dateRange.startDate);
            const end = new Date(dateRange.endDate);
            return `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`;
        }
        return "Custom";
    };

    // Function to format dates for X axis based on screen size
    const formatXAxisTick = (value: string) => {
        if (isSmallScreen) {
            return ""; // Return empty string on small screens
        }
        return value;
    };

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col">
            <Card>
                <CardHeader>
                    <div className="flex items-start md:items-center justify-between flex-col lg:flex-row gap-2">
                        <div>
                            <CardTitle className="text-2xl font-bold">
                                {user?.role !== "Staf" ? "Order Statistics" : "Purchases Statistics"}
                            </CardTitle>
                            <CardDescription>
                                {user?.role !== "Staf"
                                    ? "Order quantity and total amount over time"
                                    : "Purchases quantity and total amount over time"}
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant={selectedPeriod === "7days" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedPeriod("7days")}
                            >
                                7 Days
                            </Button>
                            <Button
                                variant={selectedPeriod === "30days" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedPeriod("30days")}
                            >
                                30 Days
                            </Button>
                            <Button
                                variant={selectedPeriod === "custom" ? "default" : "outline"}
                                size="sm"
                                onClick={() => {
                                    setSelectedPeriod("custom");
                                    setIsDateRangeModalOpen(true);
                                }}
                            >
                                {selectedPeriod === "custom" ? getDateRangeLabel() : "Custom"}
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    <ChartContainer
                        config={{
                            qty_order: {
                                label: "Order Quantity",
                                color: "hsl(var(--chart-1))",
                            },
                            total_amount: {
                                label: "Total Amount (IDR)",
                                color: "hsl(var(--chart-2))",
                            },
                        }}
                        className="h-full w-full"
                    >
                        <AreaChart
                            accessibilityLayer
                            data={data}
                            margin={{
                                left: isSmallScreen ? 0 : 8,
                                right: isSmallScreen ? 0 : 8,
                                top: 8,
                                bottom: isSmallScreen ? 0 : 8,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                interval={4}
                                tickFormatter={formatXAxisTick}
                                height={isSmallScreen ? 0 : 30}
                            />
                            <YAxis
                                yAxisId="left"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                label={
                                    isSmallScreen ? {} : { value: "Order Quantity", angle: -90, position: "insideLeft" }
                                }
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                                label={
                                    isSmallScreen ? {} : { value: "Amount (IDR)", angle: 90, position: "insideRight" }
                                }
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        formatter={(value, name) => {
                                            if (name === "total_amount") {
                                                return [`${formatCurrency(value.toString())}`, " Total Amount"];
                                            }
                                            console.log(name);
                                            return [value, " Order Quantity"];
                                        }}
                                    />
                                }
                            />
                            <defs>
                                <linearGradient id="fillQtyOrder" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="fillTotalAmount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <Area
                                yAxisId="left"
                                dataKey="qty_order"
                                type="monotone"
                                fill="url(#fillQtyOrder)"
                                fillOpacity={0.6}
                                stroke="var(--primary)"
                                strokeWidth={2}
                            />
                            <Area
                                yAxisId="right"
                                dataKey="total_amount"
                                type="monotone"
                                fill="url(#fillTotalAmount)"
                                fillOpacity={0.6}
                                stroke="var(--primary)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <DateRangeModal
                isOpen={isDateRangeModalOpen}
                onClose={() => setIsDateRangeModalOpen(false)}
                onApply={handleApplyDateRange}
                initialRange={dateRange}
            />
        </div>
    );
};
