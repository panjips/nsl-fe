import type { LucideIcon } from "lucide-react";

export interface NavMainProps {
    group?: string;
    items: {
        title: string;
        url?: string;
        icon?: LucideIcon;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
        }[];
    }[];
}

export interface NavUserProps {
    name: string;
    email: string;
    avatar: string;
}

export interface AppSidebarProps {
    menuItems: NavMainProps[];
    user: NavUserProps;
}
