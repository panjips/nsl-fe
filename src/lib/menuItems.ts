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
    TicketPercent,
    Book,
    ListOrdered,
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
                        title: "Employee",
                        url: "/dashboard/user/employee",
                    },
                    {
                        title: "Customer",
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
                icon: ReceiptText,
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
            {
                title: "Catering Package",
                url: "/dashboard/catering-package",
                icon: ShoppingBasket,
            },
        ],
    },
    {
        group: "Reservation",
        items: [
            {
                title: "Reservation",
                url: "/dashboard/reservation",
                icon: NotepadText,
            },
            {
                title: "Reservation Catering",
                url: "/dashboard/reservation-catering",
                icon: ShoppingBasket,
            },
            {
                title: "My Reservation",
                url: "/dashboard/my-reservation",
                icon: ShoppingBasket,
            },
        ],
    },
    {
        group: "Sale",
        items: [
            {
                title: "Point of Sale",
                url: "/dashboard/pos",
                icon: Calculator,
            },
            {
                title: "Online Order",
                url: "/dashboard/online-order",
                icon: ListOrdered,
            },
        ],
    },
    {
        group: "History",
        items: [
            {
                title: "Transaction History",
                url: "/dashboard/history/transaction",
                icon: TicketPercent,
            },
            {
                title: "Catering Package History",
                url: "/dashboard/history/catering-package",
                icon: TicketPercent,
            },
            {
                title: "My Transaction",
                url: "/dashboard/history/my-transaction",
                icon: TicketPercent,
            },
        ],
    },
    {
        group: "Reports",
        items: [
            {
                title: "Sales Report",
                url: "/dashboard/report/sales",
                icon: Book,
            },
            {
                title: "Inventory Report",
                url: "/dashboard/report/inventory",
                icon: Book,
            },
            {
                title: "Purchase Report",
                url: "/dashboard/report/purchase",
                icon: Book,
            },
        ],
    },
];
