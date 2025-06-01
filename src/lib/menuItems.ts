import type { NavMainProps } from "@/components/sidebar/types";
import {
  Box,
  LayoutDashboard,
  Tags,
  User,
  Package,
  BadgeDollarSign,
  NotepadText,
} from "lucide-react";

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
            title: "Management Employee",
            url: "/dashboard/user/employee",
          },
          {
            title: "Management Customer",
            url: "/dashboard/user/customer",
          },
        ],
      },
      {
        title: "Inventory",
        url: "/dashboard/inventory",
        icon: Package,
      },
      {
        title: "Purchase",
        url: "/dashboard/purchase",
        icon: BadgeDollarSign,
      },
      {
        title: "Addon",
        url: "/dashboard/addon",
        icon: NotepadText,
      },
      {
        title: "Recipe",
        url: "/dashboard/recipe",
        icon: User,
        items: [
          {
            title: "Product",
            url: "/dashboard/recipe/product",
          },
          {
            title: "Addon",
            url: "/dashboard/recipe/addon",
          },
        ],
      },
    ],
  },
];
