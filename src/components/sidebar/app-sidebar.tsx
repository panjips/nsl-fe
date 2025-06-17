import React from "react";
import { Coffee } from "lucide-react";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { AppSidebarProps } from "./types";
import { Link } from "@tanstack/react-router";

export const AppSidebar = React.memo(function AppSidebar({
    menuItems,
    user,
    handleLogout,
    ...props
}: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <Link to="/">
                                <Coffee className="!size-5" />
                                <span className="text-base font-semibold">Needsixletters</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={menuItems} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} handleLogout={handleLogout} />
            </SidebarFooter>
        </Sidebar>
    );
});
