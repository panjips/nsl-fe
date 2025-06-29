import type { Role } from "@/components/sidebar/types";
import { findMenuItem } from "@/lib/menuItems";
import { NotFound } from "@/modules/feature-shared";
import { useGlobalAuthStore, useNotificationStore } from "@/stores";
import { Outlet, createRootRoute, redirect, type BeforeLoadContextOptions } from "@tanstack/react-router";
import { useEffect } from "react";

export const withAuthGuard = ({
    location,
}: BeforeLoadContextOptions<any, any, any, any, any>): ReturnType<typeof redirect> | undefined => {
    const isAuthenticated = useGlobalAuthStore.getState().isAuthenticated;
    const currentUserRole = useGlobalAuthStore.getState().user?.role;

    const isAuthRoute =
        location.pathname === "/login" ||
        location.pathname === "/register" ||
        location.pathname === "/forgot-password" ||
        location.pathname === "/reset-password";

    if (!isAuthenticated && !isAuthRoute && location.pathname !== "/") {
        return redirect({
            to: "/login",
        });
    }

    if (isAuthRoute && isAuthenticated) {
        return redirect({ to: "/" });
    }

    if (isAuthenticated) {
        const targetMenuItem = findMenuItem(location.pathname);

        if (targetMenuItem) {
            if (targetMenuItem.roles && targetMenuItem.roles.length > 0) {
                if (currentUserRole && !targetMenuItem.roles.includes(currentUserRole as Role)) {
                    return redirect({
                        to: "/access-denied",
                    });
                }
            }
        }
    }

    return;
};

export const Route = createRootRoute({
    component: () => {
        const connectSocket = useNotificationStore((s) => s.connectSocket);

        useEffect(() => {
            connectSocket();
            return () => {};
        }, [connectSocket]);

        return (
            <>
                <Outlet />
            </>
        );
    },
    beforeLoad: withAuthGuard,
    notFoundComponent: () => <NotFound />,
});
