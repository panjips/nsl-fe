export interface ReservationReport {
    event_date: Date;
    total_price: number;
    is_use_cart: boolean;
    package_count: number;
    orderCaterings?: {
        catering_package_id: number;
        price: number;
        quantity: number;
        name: string;
    }[];
}
