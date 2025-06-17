import type { Category } from "@/modules/feature-category";

export interface Product {
    id: string;
    category_id: number;
    name: string;
    image_url: string;
    description: string;
    cost: number;
    price: number;
    is_active: boolean;
    possible_qty?: number;
}

export interface TableProduct extends Product {
    category: Category;
}
