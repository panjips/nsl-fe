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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { NavMainProps } from "./types";
import { cn } from "@/lib/utils";

export function NavMain({ items }: { items: NavMainProps[] }) {
  const location = useLocation();
  const currentPath = location.pathname;

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
      {items.map((group) => (
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
                                "border-l-2 border-l-primary "
                            )}
                          >
                            <SidebarMenuSubButton
                              asChild
                              className={cn(
                                "hover:bg-muted transition-colors",
                                isSubMenuActive(subItem.url) &&
                                  "text-primary font-semibold"
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
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
