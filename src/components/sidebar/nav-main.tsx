import { ChevronRight } from "lucide-react";
import { useLocation } from "@tanstack/react-router";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { NavMainProps, Role } from "./types";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { useGlobalAuthStore, useNotificationStore } from "@/stores";
import { useEffect, useMemo } from "react";

export function NavMain({ items }: { items: NavMainProps[] }) {
    const location = useLocation();
    const currentPath = location.pathname;
    const { user } = useGlobalAuthStore();

    const filteredItemsByRole = useMemo(() => {
        if (!user?.role) return [];

        return items
            .filter((group) => {
                if (!group.roles) return true;

                return group.roles.includes(user.role as Role);
            })
            .map((group) => {
                const filteredItems = group.items
                    .filter((item) => {
                        if (!item.roles) return true;

                        return item.roles.includes(user.role as Role);
                    })
                    .map((item) => {
                        if (item.items && item.items.length > 0) {
                            const filteredSubItems = item.items.filter((subItem) => {
                                if (!subItem.roles) return true;

                                return subItem.roles.includes(user.role as Role);
                            });

                            return {
                                ...item,
                                items: filteredSubItems.length > 0 ? filteredSubItems : undefined,
                            };
                        }

                        return item;
                    })
                    .filter((item) => {
                        if (item.items && item.items.length === 0) {
                            return false;
                        }
                        return true;
                    });

                return {
                    ...group,
                    items: filteredItems,
                };
            })
            .filter((group) => group.items.length > 0);
    }, [items, user?.role]);

    const onlineOrderCount = useNotificationStore((state) => state.onlineOrderCount);

    useEffect(() => {
        useNotificationStore.getState().connectSocket();
        if (onlineOrderCount === 0) {
            try {
                const persistedString = localStorage.getItem("notification-storage");
                if (persistedString) {
                    const persisted = JSON.parse(persistedString);
                    if (persisted.state?.onlineOrderCount) {
                        useNotificationStore.setState({
                            onlineOrderCount: persisted.state.onlineOrderCount,
                        });
                    }
                }
            } catch (error) {
                console.error("Failed to parse persisted notification count:", error);
            }
        }
    }, []);

    const isMenuActive = (url: string | undefined) => {
        if (!url) return false;

        if (url === "/dashboard" && currentPath !== "/dashboard") {
            return false;
        }

        const urlSegments = url.split("/").filter(Boolean);
        const pathSegments = currentPath.split("/").filter(Boolean);

        if (urlSegments.length > pathSegments.length) return false;

        for (let i = 0; i < urlSegments.length; i++) {
            if (urlSegments[i] !== pathSegments[i]) {
                return false;
            }
        }

        return true;
    };

    const isSubMenuActive = (url: string | undefined) => {
        return url === currentPath;
    };

    return (
        <>
            {filteredItemsByRole.map((group) => (
                <SidebarGroup key={group.group}>
                    <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
                    <SidebarMenu>
                        {group.items.map((item) =>
                            item.items && item.items.length > 0 ? (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    defaultOpen={item.isActive || isMenuActive(item.url)}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                                className={
                                                    isMenuActive(item.url)
                                                        ? "bg-primary text-primary-foreground pointer-events-none"
                                                        : "hover:bg-muted"
                                                }
                                            >
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub data-active={isMenuActive(item.url)}>
                                                {item.items?.map((subItem) => (
                                                    <SidebarMenuSubItem
                                                        key={subItem.title}
                                                        className={cn(
                                                            "px-2.5",
                                                            isSubMenuActive(subItem.url) &&
                                                                "border-l-2 border-l-primary ",
                                                        )}
                                                    >
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            className={cn(
                                                                "hover:bg-muted transition-colors",
                                                                isSubMenuActive(subItem.url) &&
                                                                    "text-primary font-semibold",
                                                            )}
                                                        >
                                                            <a href={subItem.url}>
                                                                <span>{subItem.title}</span>
                                                            </a>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ) : (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        asChild
                                        className={
                                            isMenuActive(item.url)
                                                ? "bg-primary text-primary-foreground pointer-events-none"
                                                : "hover:bg-muted"
                                        }
                                    >
                                        <a href={item.url}>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            {item.title === "Online Order" && (
                                                <Badge
                                                    className={cn(
                                                        "bg-primary text-primary-foreground ml-auto",
                                                        isMenuActive(item.url) && "bg-primary-foreground text-primary",
                                                    )}
                                                >
                                                    {onlineOrderCount}
                                                </Badge>
                                            )}
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ),
                        )}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </>
    );
}
