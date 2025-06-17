import { z } from "zod";

export enum OrderStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}

export const UpdateOrderStatusDTO = z.object({
    order_status: z.nativeEnum(OrderStatus),
});

export type UpdateOrderStatusDTOType = z.infer<typeof UpdateOrderStatusDTO>;
