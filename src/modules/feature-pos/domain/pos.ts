import type { Addon } from "@/modules/feature-addon";
import type { TableProduct } from "@/modules/feature-product";

export interface Product extends TableProduct {}

export interface AddOn extends Addon {
    quantity?: number;
}

export interface CartItem {
    id: string;
    productId: number;
    name: string;
    price: number;
    quantity: number;
    possibleQty?: number;
    sugar_type?: string;
    addOns: AddOn[];
}

export enum OrderType {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE",
}

export interface OrderResponse {
    order_id: number;
    token?: string;
}
