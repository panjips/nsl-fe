import type { UserLogin } from "@/modules/feature-auth";
import type { LucideIcon } from "lucide-react";

export type Role = "Staf" | "Kasir" | "Pemilik" | "Pelanggan";

export interface NavMainProps {
    group?: string;
    roles?: Role[];
    items: {
        title: string;
        url?: string;
        icon?: LucideIcon;
        isActive?: boolean;
        roles?: Role[];
        items?: {
            title: string;
            url: string;
            roles?: Role[];
        }[];
    }[];
}

export interface NavUserProps {
    name: string;
    email: string;
}

export interface AppSidebarProps {
    menuItems: NavMainProps[];
    user: UserLogin;
    handleLogout?: () => void;
}
