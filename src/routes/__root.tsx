import { useGlobalAuthStore } from "@/stores";
import { Outlet, createRootRoute, redirect, type BeforeLoadContextOptions } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const withAuthGuard = ({
    location,
    // prevLocation,
}: BeforeLoadContextOptions<any, any, any, any, any>): ReturnType<typeof redirect> | undefined => {
    const isAuthenticated = useGlobalAuthStore.getState().isAuthenticated;

    const isAuthRoute =
        // location.pathname === "/login" ||
        location.pathname === "/register" ||
        location.pathname === "/forgot-password" ||
        location.pathname === "/reset-password";

    if (isAuthenticated && isAuthRoute) {
        return redirect({ to: "/" });
    }

    if (!isAuthenticated && !isAuthRoute && location.pathname !== "/") {
        return redirect({
            to: "/login",
            search: { redirect: location.pathname },
        });
    }

    return;
};

export const Route = createRootRoute({
    component: () => (
        <>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
    beforeLoad: withAuthGuard,
});
