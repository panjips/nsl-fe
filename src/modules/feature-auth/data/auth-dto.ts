import { z } from "zod";

export const LoginReqDTO = z.object({
    identifier: z.string().min(1, "Email or username is required"),
    password: z.string().min(1, "Password is required"),
});

export const RegisterReqDTO = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email"),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
});

export const ForgotPasswordReqDTO = z.object({
    email: z.string().email("Please enter a valid email address"),
});

export const ResetPasswordReqDTO = z
    .object({
        newPassword: z.string().min(8, "Password must be at least 8 characters"),
        confirmNewPassword: z.string().min(8, "Password must be at least 8 characters"),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Passwords don't match",
        path: ["confirmNewPassword"],
    });

export type ResetPasswordReqDTOType = z.infer<typeof ResetPasswordReqDTO>;
export type ForgotPasswordReqDTOType = z.infer<typeof ForgotPasswordReqDTO>;
export type RegisterReqDTOType = z.infer<typeof RegisterReqDTO>;
export type LoginReqDTOType = z.infer<typeof LoginReqDTO>;
