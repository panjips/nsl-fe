import { z } from "zod";

export const RoleEnum = {
  KASIR: "Kasir",
  PELANGGAN: "Pelanggan",
  STAF: "Staf",
} as const;

export const CreateUserDTO = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, "Name is required"),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email address"),
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(1, "Username is required"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, "Password must be at least 8 characters"),
  role: z.string({
    required_error: "Role is required",
    invalid_type_error: "Role must be a string",
  }),
  phone_number: z
    .string({
      required_error: "Phone number is required",
      invalid_type_error: "Phone number must be a string",
    })
    .regex(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits"),
});

export const UpdateUserDTO = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  username: z.string().optional(),
  role: z.string().optional(),
  phone_number: z.string().min(10).optional(),
});

export type CreateUserDTOType = z.infer<typeof CreateUserDTO>;
export type UpdateUserDTOType = z.infer<typeof UpdateUserDTO>;
