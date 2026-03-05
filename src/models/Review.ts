import { Product } from "./Product";

export interface Review {
    id: number;
    product: Product;
    rating: number;
    author: string;
    comment: string;
}
