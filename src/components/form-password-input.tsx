import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { ReactNode } from "@tanstack/react-router";

interface FormPasswordInputProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    name: keyof T extends string ? keyof T : string;
    label: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
    description?: string;
    labelSuffix?: ReactNode;
    labelContainerClassName?: string;
}

export function FormPasswordInput<T extends FieldValues>({
    form,
    name,
    label,
    placeholder = "••••••••",
    required = false,
    className,
    description,
    labelSuffix,
    labelContainerClassName,
}: FormPasswordInputProps<T>) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormField
            control={form.control}
            name={name as any}
            render={({ field }) => (
                <FormItem>
                    <div className={cn("flex items-center justify-between", labelContainerClassName)}>
                        <FormLabel>
                            {label}
                            {required && <span className="text-destructive ml-1">*</span>}
                        </FormLabel>
                        {labelSuffix}
                    </div>
                    <div className="relative">
                        <FormControl>
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder={placeholder}
                                className={cn("pr-10", className)}
                                {...field}
                            />
                        </FormControl>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                    </div>
                    {description && <p className="text-sm text-muted-foreground">{description}</p>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
