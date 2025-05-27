import type { NavMainProps } from "@/components/sidebar/types";
import { Box, LayoutDashboard, Tags, User } from "lucide-react";

export const menuItems: NavMainProps[] = [
  {
    group: "General",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    group: "Data Master",
    items: [
      {
        title: "Category",
        url: "/dashboard/category",
        icon: Tags,
      },
      {
        title: "Product",
        url: "/dashboard/product",
        icon: Box,
      },
      {
        title: "User",
        url: "/dashboard/user",
        icon: User,
        items: [
          {
            title: "Management User",
            url: "/dashboard/user",
          },
          {
            title: "Management Customer",
            url: "/dashboard/user/customer",
          },
        ],
      },
    ],
  },
];
