import type { NavMainProps } from "@/components/sidebar/types";
import { Box, LayoutDashboard, Tags } from "lucide-react";

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
    ],
  },
];
