import { ResetPasswordPage } from "@/modules/feature-auth/pages";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(auth)/reset-password")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <ResetPasswordPage />
            </div>
        </div>
    );
}
