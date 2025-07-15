export interface Inventory {
    id: number;
    name: string;
    quantity: string;
    unit: string;
    min_quantity: string;
    is_active: boolean;
}

export interface InventoryOpname {
    id: number;
    inventory_id: number;
    opname_date: string;
    actual_quantity: string;
    system_quantity: string;
    difference: string;
    notes?: string;
    inventory: Inventory;
}
