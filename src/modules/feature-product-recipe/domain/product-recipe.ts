import type { Inventory } from "@/modules/feature-inventory";
import type { Product } from "@/modules/feature-product";

export type SugarType = "NORMAL" | "LESS_SUGAR" | "NO_SUGAR";

export interface Recipe {
    id: number;
    product_id: number;
    inventory?: Inventory;
    inventory_id: number;
    quantity_used: number;
    sugar_type?: SugarType;
    is_active: boolean;
}

export interface ProductRecipe extends Omit<Product, "sugar_type"> {
    sugar_type?: SugarType;
    recipes: Recipe[];
}
