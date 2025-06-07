import type { Inventory } from "@/modules/feature-inventory";

export interface Purchase {
    id: number;
    inventory_id: number;
    total: string;
    quantity: string;
    purchase_date: string;
    is_active: boolean;
}

export interface PurchaseWithInventory extends Purchase {
    inventory: Inventory;
}
