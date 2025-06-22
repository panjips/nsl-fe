import type { NavMainProps } from "@/components/sidebar/types";
import {
    Box,
    LayoutDashboard,
    Tags,
    User,
    Package,
    BadgeDollarSign,
    NotepadText,
    ReceiptText,
    ShoppingBasket,
    Calculator,
    FileText,
    ListOrdered,
    History,
    Clock,
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
            {
                title: "Store Operation",
                url: "/dashboard/operation",
                icon: Clock,
                roles: ["Staf", "Pemilik", "Kasir"],
            },
        ],
    },
    {
        group: "Data Master",
        roles: ["Staf", "Kasir", "Pemilik"],
        items: [
            {
                title: "Category",
                url: "/dashboard/category",
                icon: Tags,
                roles: ["Staf", "Pemilik"],
            },
            {
                title: "Product",
                roles: ["Staf", "Pemilik", "Kasir"],
                url: "/dashboard/product",
                icon: Box,
            },
            {
                title: "User",
                url: "/dashboard/user",
                roles: ["Staf", "Pemilik"],
                icon: User,
                items: [
                    {
                        roles: ["Staf", "Pemilik"],
                        title: "Employee",
                        url: "/dashboard/user/employee",
                    },
                    {
                        roles: ["Staf", "Pemilik"],
                        title: "Customer",
                        url: "/dashboard/user/customer",
                    },
                ],
            },
            {
                title: "Inventory",
                url: "/dashboard/inventory",
                roles: ["Staf", "Pemilik"],
                icon: Package,
            },
            {
                title: "Purchase",
                roles: ["Staf", "Pemilik"],
                url: "/dashboard/purchase",
                icon: BadgeDollarSign,
            },
            {
                title: "Addon",
                roles: ["Staf", "Pemilik", "Kasir"],
                url: "/dashboard/addon",
                icon: NotepadText,
            },
            {
                title: "Recipe",
                url: "/dashboard/recipe",
                roles: ["Staf", "Pemilik"],
                icon: ReceiptText,
                items: [
                    {
                        roles: ["Staf", "Pemilik"],
                        title: "Product",
                        url: "/dashboard/recipe/product",
                    },
                    {
                        roles: ["Staf", "Pemilik"],
                        title: "Addon",
                        url: "/dashboard/recipe/addon",
                    },
                ],
            },
            {
                title: "Catering Package",
                url: "/dashboard/catering-package",
                roles: ["Staf", "Pemilik"],
                icon: ShoppingBasket,
            },
        ],
    },
    {
        group: "Reservation",
        roles: ["Staf", "Pemilik", "Kasir", "Pelanggan"],
        items: [
            {
                title: "Reservation",
                roles: ["Staf", "Pemilik", "Kasir"],
                url: "/dashboard/reservation",
                icon: NotepadText,
            },
            {
                title: "Reservation Catering",
                roles: ["Pelanggan"],
                url: "/dashboard/reservation-catering",
                icon: ShoppingBasket,
            },
            {
                title: "My Reservation",
                roles: ["Pelanggan"],
                url: "/dashboard/my-reservation",
                icon: ShoppingBasket,
            },
        ],
    },
    {
        group: "Sale",
        roles: ["Pemilik", "Kasir"],
        items: [
            {
                title: "Point of Sale",
                roles: ["Pemilik", "Kasir"],
                url: "/dashboard/pos",
                icon: Calculator,
            },
            {
                title: "Online Order",
                roles: ["Pemilik", "Kasir"],
                url: "/dashboard/online-order",
                icon: ListOrdered,
            },
        ],
    },
    {
        group: "History",
        roles: ["Staf", "Pemilik", "Kasir", "Pelanggan"],
        items: [
            {
                title: "My Transaction",
                roles: ["Pelanggan"],
                url: "/dashboard/history/my-transaction",
                icon: History,
            },
            {
                title: "Catering",
                roles: ["Staf", "Pemilik", "Kasir"],
                url: "/dashboard/history/catering",
                icon: History,
            },
            {
                title: "Transaction",
                roles: ["Pemilik", "Kasir"],
                url: "/dashboard/history/transaction",
                icon: History,
            },
            {
                title: "Inventory Usage",
                roles: ["Staf", "Pemilik"],
                url: "/dashboard/history/inventory-usage",
                icon: History,
            },
        ],
    },
    {
        group: "Reports",
        roles: ["Staf", "Pemilik"],
        items: [
            {
                title: "Product Sales ",
                roles: ["Pemilik"],
                url: "/dashboard/reports/product-sales",
                icon: FileText,
            },
            {
                title: "Inventory ",
                roles: ["Staf", "Pemilik"],
                url: "/dashboard/reports/inventory",
                icon: FileText,
            },
            {
                title: "Purchase ",
                roles: ["Staf", "Pemilik"],
                url: "/dashboard/reports/purchase",
                icon: FileText,
            },
            {
                title: "Reservation ",
                roles: ["Pemilik"],
                url: "/dashboard/reports/reservation",
                icon: FileText,
            },
            {
                title: "Revenue ",
                roles: ["Pemilik"],
                url: "/dashboard/reports/revenue",
                icon: FileText,
            },
        ],
    },
];

export const findMenuItem = (pathname: string) => {
    for (const group of menuItems) {
        for (const item of group.items) {
            if (item.url === pathname) {
                return item;
            }

            if (item.items) {
                for (const nestedItem of item.items) {
                    if (nestedItem.url === pathname) {
                        return nestedItem;
                    }
                }
            }
        }
    }
    return null;
};
