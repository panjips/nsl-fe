import type { Inventory } from "@/modules/feature-inventory";

export const paymentStatusDisplayNames = {
    SUCCESS: "SUCCESS",
    PENDING: "PENDING",
    FAILURE: "FAILURE",
    EXPIRE: "EXPIRED",
};

export const orderStatusDisplayNames = {
    PENDING: "PENDING",
    PROCESSING: "PROCESSING",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
};

export interface Order {
    id: number;
    user_id: number | null;
    order_date: string;
    order_type: "OFFLINE" | "ONLINE";
    order_status: (typeof orderStatusDisplayNames)[keyof typeof orderStatusDisplayNames];
    total_amount: string;
    notes: string | null;
    is_active: boolean;
}


export interface OrderInventoryUsage {
  id: number;
  order_id: number;
  inventory_id: number;
  quantity_used: string;
  is_active: boolean;
  inventory: Inventory;
  order: Order;
}