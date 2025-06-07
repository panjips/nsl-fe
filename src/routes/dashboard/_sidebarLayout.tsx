import { createFileRoute } from "@tanstack/react-router";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "@tanstack/react-router";
import { menuItems } from "@/lib/menuItems";
import { useMemo } from "react";

export const Route = createFileRoute("/dashboard/_sidebarLayout")({
    component: RouteComponent,
});

function RouteComponent() {
    const memoizedMenuItems = useMemo(() => menuItems, []);
    const memoizedFakeUser = useMemo(
        () => ({
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
        }),
        [],
    );

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" menuItems={memoizedMenuItems} user={memoizedFakeUser} />
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
