export interface CateringPackage {
    id: number;
    name: string;
    description?: string;
    price: number;
    free_cup?: number;
    size_unit: string;
    size_volume: number;
    quantity_cup: number;
    is_active: boolean;
}
