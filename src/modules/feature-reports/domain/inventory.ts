export interface InventoryUsageReport {
    id: number;
    name: string;
    unit: string;
    total_quantity_used: number;
    current_stock: number;
}

export interface InventoryPurchaseReport {
    id: number;
    name: string;
    unit: string;
    total_quantity_purchased: number;
    total_cost: number;
    current_stock: number;
}
