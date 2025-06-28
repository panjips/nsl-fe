export interface Addon {
    id: number;
    name: string;
    description?: string;
    cost: number;
    price: number;
    possible_qty?: number;
    is_active: boolean;
}
