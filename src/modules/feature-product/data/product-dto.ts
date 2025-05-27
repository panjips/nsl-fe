import { z } from "zod";

export const CreateProductDTO = z.object({
  name: z.string().min(1, "Product name is required"),
  category_id: z
    .number({
      required_error: "Category is required",
      invalid_type_error: "Category must be selected",
    })
    .positive("Category is required"),
  description: z.string().optional(),
  image: z
    .custom<File>()
    .refine((file) => !file || file instanceof File, "Invalid file type")
    .refine(
      (file) => !file || file.size <= 1024 * 1024,
      "Image size should not exceed 1MB"
    )
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    )
    .optional(),
  cost: z
    .number({
      required_error: "Cost is required",
      invalid_type_error: "Cost must be a number",
    })
    .positive("Cost must be greater than 0"),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be greater than 0"),
});

export const UpdateProductDTO = z.object({
  name: z.string().optional(),
  category_id: z.number().optional().nullable(),
  description: z.string().optional(),
  cost: z.number().positive("Cost must be positive").optional(),
  price: z.number().positive("Price must be positive").optional(),
  is_active: z.boolean().optional(),
});

export type CreateProductDTOType = z.infer<typeof CreateProductDTO>;
export type UpdateProductDTOType = z.infer<typeof UpdateProductDTO>;
