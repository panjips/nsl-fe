import { z } from "zod";

export const BulkCreateAddonRecipeDTO = z.object({
    addon_id: z.number().int().positive("Addon ID is required"),
    recipes: z
        .array(
            z.object({
                inventory_id: z.number().int().positive("Inventory ID is required"),
                quantity_used: z.number().positive("Quantity used must be positive"),
            }),
        )
        .min(1, "At least one recipe is required"),
});

export type BulkCreateAddonRecipeDTOType = z.infer<typeof BulkCreateAddonRecipeDTO>;
