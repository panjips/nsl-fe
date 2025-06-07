import type { Product } from "@/modules/feature-product";

export interface Recipe {
    id: number;
    product_id: number;
    inventory_id: number;
    quantity_used: number;
    is_active: boolean;
}

export interface ProductRecipe extends Product {
    recipes: Recipe[];
}
