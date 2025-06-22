export type ReportType = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | "CUSTOM";

export const PaymentType = {
    ALL: "ALL",
    QRIS_MIDTRANS: "QRIS_MIDTRANS",
    QRIS_OFFLINE: "QRIS_OFFLINE",
    CASH: "CASH",
} as const;

export const OrderType = {
    ALL: "ALL",
    OFFLINE: "OFFLINE",
    ONLINE: "ONLINE",
} as const;

export type PaymentTypeValue = (typeof PaymentType)[keyof typeof PaymentType];
export type OrderTypeValue = (typeof OrderType)[keyof typeof OrderType];

export interface Product {
    product_id: number;
    product_name: string;
    quantity: number;
    price: string;
    cost: string;
    total: string;
    total_cost: string;
    gross_profit: string;
}

export interface Addon {
    addon_id: number;
    addon_name: string;
    quantity: number;
    price: string;
    cost: string;
    total: string;
    total_cost: string;
    gross_profit: string;
}

export interface SalesData {
    productSales: Product[];
    addonSales: Addon[];
}

export interface DateRange {
    start: Date;
    end: Date;
    label: string;
}

export interface BaseReportParams {
    type: ReportType;
    startDate?: string;
    endDate?: string;
}

export interface ProductSalesReportParams extends BaseReportParams {
    paymentType?: PaymentTypeValue;
    orderType?: OrderTypeValue;
}
