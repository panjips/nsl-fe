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
