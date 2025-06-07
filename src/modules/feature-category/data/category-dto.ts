import { z } from "zod";

export const CreateCategoryDTO = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
});

export const UpdateCategoryDTO = z.object({
    id: z.number(),
    name: z.string().min(1),
    description: z.string().optional(),
});

export type CreateCategoryDTOType = z.infer<typeof CreateCategoryDTO>;
export type UpdateCategoryDTOType = z.infer<typeof UpdateCategoryDTO>;
