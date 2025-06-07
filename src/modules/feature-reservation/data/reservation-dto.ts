import { z } from "zod";

const PackageInputSchema = z.object({
    id: z.number().int().positive("Package ID is required"),
});

export const CreateReservationDTO = z.object({
    location: z.string().min(3, "Location must be at least 3 characters"),
    event_date: z.string().datetime("Invalid date format"),
    notes: z.string().optional(),
    is_use_cart: z.boolean(),
    packages: z.array(PackageInputSchema).min(1, "At least one package is required"),
});

export const UpdateReservationDTO = z.object({
    location: z.string().min(3, "Location must be at least 3 characters").optional(),
    event_date: z.string().datetime("Invalid date format").optional(),
    notes: z.string().optional(),
    is_use_cart: z.boolean().optional().default(false),
    packages: z.array(PackageInputSchema).optional(),
});

export type CreateReservationDTOType = z.infer<typeof CreateReservationDTO>;
export type UpdateReservationDTOType = z.infer<typeof UpdateReservationDTO>;
