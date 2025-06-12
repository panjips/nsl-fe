import { createFileRoute } from "@tanstack/react-router";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "@tanstack/react-router";
import { menuItems } from "@/lib/menuItems";
import { useMemo } from "react";
import { useGlobalAuthStore } from "@/stores";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_sidebarLayout")({
    component: RouteComponent,
});

function RouteComponent() {
    const memoizedMenuItems = useMemo(() => menuItems, []);
    const { user, logout } = useGlobalAuthStore();
    const navigate = useNavigate();

    const memoizedFakeUser = useMemo(
        () => ({
            name: user?.name || "Guest User",
            email: user?.email || "",
        }),
        [],
    );

    const handleLogout = () => {
        logout();
        navigate({ to: "/login" });
    };

    return (
        <SidebarProvider>
            <AppSidebar
                variant="inset"
                menuItems={memoizedMenuItems}
                user={memoizedFakeUser}
                handleLogout={handleLogout}
            />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
