import { Category } from './Category';
import { Product } from './Product';

export interface Supplier {
    id: number;
    name: string;
    available: number;
    category: Category;
    products: Product[];
}