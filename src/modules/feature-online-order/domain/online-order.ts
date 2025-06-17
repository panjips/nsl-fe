import type { Addon } from "@/modules/feature-addon";
import type { Product } from "@/modules/feature-product";

export interface User {
    id: string;
    name: string;
    email: string;
    phone_number: string;
}

export interface Payment {
    id: number;
    order_id: number;
    payment_type: string;
    trx_status: string;
    trx_time: string;
    paid_amount: string;
    is_active: boolean;
}

export interface OrderProductItem {
    id: number;
    order_id: number;
    product_id: number;
    cost: string;
    price: string;
    quantity: number;
    subtotal: string;
    product: Product;
    addons: OrderAddonItem[];
}

export interface OrderAddonItem {
    id: number;
    order_product_item_id: number;
    addon_id: number;
    cost: string;
    price: string;
    quantity: number;
    subtotal: string;
    addon: Addon;
}

export interface OnlineOrder {
    id: string;
    user_id: string;
    user: User | null;
    order_date: string;
    order_type: string;
    order_status: string;
    total_amount: number;
    notes?: string;
    payment: Payment | null;
    items: OrderProductItem[];
}
