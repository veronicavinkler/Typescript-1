import { Product } from "./Product";

export interface WarehouseStock {
    id: number;
    product: Product;
    warehouse: string;
    quantity: number;
}
