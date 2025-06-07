import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { useResetPassword } from "../hooks";
import { ArrowLeft } from "lucide-react";
import { FormPasswordInput } from "@/components/form-password-input";
import { Form } from "@/components/ui/form";

export function ResetPasswordPage({ className, ...props }: React.ComponentProps<"div">) {
    const { form, onSubmit, isLoading, isSuccess, countdown, hasToken } = useResetPassword();

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>Enter your new password below</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form id="reset-password-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormPasswordInput form={form} name="newPassword" label="New Password" required />

                            <FormPasswordInput
                                form={form}
                                name="confirmNewPassword"
                                label="Confirm Password"
                                required
                            />
                            {isSuccess && (
                                <p className="text-sm text-muted-foreground">
                                    Redirecting to login in {countdown} seconds...
                                </p>
                            )}

                            <Button type="submit" className="w-full" disabled={isLoading || !hasToken}>
                                {isLoading ? "Resetting Password..." : "Reset Password"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link
                        to="/login"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to login
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
