import { Category } from './Category';
import { Product } from './Product';

export interface Supplier {
    id: number;
    name: string;
    description: string;
    category: Category;
    products: Product[];
}