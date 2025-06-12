import { z } from "zod";
import { OrderType } from "../domain";

export const CreateOrderAddonItemDTO = z.object({
    addon_id: z.number().int().positive("Addon ID is required"),
    quantity: z.number().int().positive("Quantity must be positive").default(1),
});

export const CreateOrderProductItemDTO = z.object({
    product_id: z.number().int().positive("Product ID is required"),
    quantity: z.number().int().positive("Quantity must be positive").default(1),
    addons: z.array(CreateOrderAddonItemDTO).optional(),
});

export const CreateOrderDTO = z.object({
    user_id: z.number().int().positive("User ID is required").optional(),
    order_type: z.nativeEnum(OrderType),
    payment_type: z.string().min(1, "Payment type is required"),
    notes: z.string().optional(),
    items: z.array(CreateOrderProductItemDTO).nonempty("At least one product item is required"),
});

export type CreateOrderAddonItemDTOType = z.infer<typeof CreateOrderAddonItemDTO>;
export type CreateOrderProductItemDTOType = z.infer<typeof CreateOrderProductItemDTO>;
export type CreateOrderDTOType = z.infer<typeof CreateOrderDTO>;
