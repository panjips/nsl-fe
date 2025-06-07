import type { CateringPackage } from "@/modules/feature-catering-package";
import type { User } from "@/modules/feature-user-management";

export interface Reservation {
    id: number;
    user_id: number;
    location: string;
    event_date: string;
    notes: string;
    status: string;
    is_use_cart: boolean;
    total_price: number;
}

export interface OrderCatering {
    id: number;
    reservation_id: number;
    catering_package_id: number;
    price: number;
    free_cup?: number;
    size_unit: string;
    size_volume: number;
    quantity_cup: number;
}

export interface OrderCateringWithPackage extends OrderCatering {
    cateringPackage: Pick<CateringPackage, "name" | "description">;
}

export interface ReservationWithOrderCatering extends Reservation {
    orderCaterings: OrderCatering[];
}

export interface ReservationWithOrderCateringAndPackage extends Reservation {
    user?: Pick<User, "name" | "email" | "phone_number">;
    orderCaterings: OrderCateringWithPackage[];
}

export const ReservationStatus = {
    PENDING: "PENDING",
    CONFIRMED: "CONFIRMED",
    WAITING_DEPOSIT: "WAITING_DEPOSIT",
    DEPOSIT_PAID: "DEPOSIT_PAID",
    PAYMENT_PENDING: "PAYMENT_PENDING",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
};
