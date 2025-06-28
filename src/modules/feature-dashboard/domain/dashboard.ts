export interface PelangganStatistik {
    date: string;
    qty_order: number;
    total_amount: number;
    total_cost?: number;
}

export interface TopProduct {
    name: string;
    quantity: number;
    type: string;
}

export type DateFilterPeriod = "7days" | "30days" | "custom";

export interface DateRangeFilter {
    startDate: string | null;
    endDate: string | null;
}
