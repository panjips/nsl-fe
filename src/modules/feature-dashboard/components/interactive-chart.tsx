import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { PelangganStatistik } from "../domain";
import { formatCurrency } from "@/lib/utils";

export interface InteractiveChartProps {
    data: PelangganStatistik[];
    selectedPeriod: "7days" | "30days";
    setSelectedPeriod: (period: "7days" | "30days") => void;
}

export const InteractiveChart = ({ data, selectedPeriod, setSelectedPeriod }: InteractiveChartProps) => {
    return (
        <div className="w-full h-full flex flex-col">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl font-bold">Order Statistics</CardTitle>
                            <CardDescription>Order quantity and total amount over time</CardDescription>
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
                                left: 8,
                                right: 8,
                                top: 8,
                                bottom: 8,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                interval={selectedPeriod === "30days" ? 4 : 0}
                            />
                            <YAxis
                                yAxisId="left"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                label={{ value: "Order Quantity", angle: -90, position: "insideLeft" }}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                                label={{ value: "Amount (IDR)", angle: 90, position: "insideRight" }}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        formatter={(value, name) => {
                                            if (name === "total_amount") {
                                                return [`${formatCurrency(value.toString())}`, " Total Amount"];
                                            }
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
        </div>
    );
};
