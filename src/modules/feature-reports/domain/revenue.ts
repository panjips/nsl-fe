export interface RevenueReport {
    totalRevenue: number;
    orders: {
        total: number;
        count: number;
    };
    reservations: {
        total: number;
        count: number;
    };
}
