import { Category } from "./Category";

export interface Discount {
    id: number;
    name: string;
    category: Category;
    percentage: number;
    minRating?: number;
}
