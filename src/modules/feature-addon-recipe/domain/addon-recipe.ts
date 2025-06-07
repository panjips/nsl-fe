import type { Addon } from "@/modules/feature-addon";

export interface Recipe {
    id: number;
    product_id: number;
    inventory_id: number;
    quantity_used: number;
    is_active: boolean;
}

export interface AddonRecipe extends Addon {
    recipes: Recipe[];
}
