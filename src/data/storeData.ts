import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { Supplier } from "../models/Supplier";
import { WarehouseStock } from "../models/WarehouseStock";
import { Review } from "../models/Review";
import { Discount } from "../models/Discount";

export const categories: Category[] = [
    { id: 1, name: "Electronics", description: "Devices and gadgets" },
    { id: 2, name: "Clothing", description: "Apparel and accessories" },
    { id: 3, name: "Home Appliances", description: "Appliances for home use" }
];

export const products: Product[] = [
    {
        id: 1,
        name: "Phone",
        description: "A smartphone with a sleek design and powerful features.",
        price: 699.99,
        stock: 2,
        category: categories[0],
        specifications: {
            display: "6.5-inch OLED",
            processor: "Octa-core 2.8 GHz",
            ram: "8 GB"
        }
    },
    {
        id: 2,
        name: "T-Shirt",
        description: "A comfortable cotton t-shirt available in various colors.",
        price: 19.99,
        stock: 6,
        category: categories[1],
        specifications: {
            material: "100% Cotton",
            sizes: "S, M, L, XL"
        }
    },
    {
        id: 3,
        name: "Blender",
        description: "A powerful blender perfect for smoothies and soups.",
        price: 89.99,
        stock: 0,
        category: categories[2],
        specifications: {
            power: "500W",
            capacity: "1.5 liters"
        }
    }
];

export const suppliers: Supplier[] = [
    {
        id: 1,
        name: "Nordic Tech Supply",
        description: "Electronics distributor",
        category: categories[0],
        products: [products[0]]
    },
    {
        id: 2,
        name: "Baltic Fashion Hub",
        description: "Clothing wholesaler",
        category: categories[1],
        products: [products[1]]
    },
    {
        id: 3,
        name: "HomeWare Partner",
        description: "Home appliances supplier",
        category: categories[2],
        products: [products[2]]
    }
];

export const warehouseStocks: WarehouseStock[] = [
    { id: 1, product: products[0], warehouse: "Tallinn", quantity: 1 },
    { id: 2, product: products[0], warehouse: "Tartu", quantity: 1 },
    { id: 3, product: products[1], warehouse: "Tallinn", quantity: 4 },
    { id: 4, product: products[1], warehouse: "Parnu", quantity: 2 },
    { id: 5, product: products[2], warehouse: "Tallinn", quantity: 0 }
];

export const reviews: Review[] = [
    { id: 1, product: products[0], rating: 4.8, author: "Anna", comment: "Excellent phone" },
    { id: 2, product: products[0], rating: 4.4, author: "Mark", comment: "Great battery" },
    { id: 3, product: products[1], rating: 3.9, author: "Liis", comment: "Good quality" },
    { id: 4, product: products[1], rating: 4.1, author: "Karl", comment: "Fits well" }
];

export const discountRules: Discount[] = [
    { id: 1, name: "Electronics promo", category: categories[0], percentage: 12, minRating: 4.5 },
    { id: 2, name: "Clothing spring sale", category: categories[1], percentage: 8 },
    { id: 3, name: "Home appliances deal", category: categories[2], percentage: 5, minRating: 4.0 }
];
