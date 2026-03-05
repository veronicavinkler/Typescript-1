import { categories, products } from "../data/storeData.js";
import { createTask2Layout } from "./layout.js";
import { createProductAdd } from "./ProductAdd.js";
import { createProductList } from "./ProductList.js";
const STORAGE_KEY = "task2_products_v1";
const getStockStatus = (stock) => {
    if (stock === 0) {
        return "OUT";
    }
    if (stock <= 2) {
        return "LOW";
    }
    return "IN_STOCK";
};
const cloneProducts = (items) => {
    return items.map((item) => ({
        ...item,
        category: categories.find((category) => category.id === item.category.id) ?? item.category,
        specifications: item.specifications ? { ...item.specifications } : undefined
    }));
};
const loadInitialProducts = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return cloneProducts(products);
    }
    try {
        const parsed = JSON.parse(raw);
        return cloneProducts(parsed);
    }
    catch {
        return cloneProducts(products);
    }
};
const saveProducts = (items) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};
let items = loadInitialProducts();
const { formMount, listMount } = createTask2Layout();
const productAdd = createProductAdd(formMount, categories);
const productList = createProductList(listMount, categories, getStockStatus);
const applySort = (list, sort) => {
    return [...list].sort((a, b) => {
        switch (sort) {
            case "price_asc":
                return a.price - b.price;
            case "price_desc":
                return b.price - a.price;
            case "stock_desc":
                return b.stock - a.stock;
            default:
                return a.name.localeCompare(b.name);
        }
    });
};
const render = () => {
    const filters = productList.getFilterValues();
    let result = [...items];
    if (filters.category !== "all") {
        result = result.filter((item) => item.category.id === filters.category);
    }
    if (filters.status !== "all") {
        result = result.filter((item) => getStockStatus(item.stock) === filters.status);
    }
    productList.renderRows(applySort(result, filters.sort));
};
productAdd.onSubmit((input) => {
    const category = categories.find((entry) => entry.id === input.categoryId);
    if (!category) {
        return;
    }
    const nextId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    const nextItem = {
        id: nextId,
        name: input.name,
        description: input.description,
        price: input.price,
        stock: input.stock,
        category,
        specifications: input.specifications
    };
    items = [...items, nextItem];
    saveProducts(items);
    render();
});
productList.onFiltersChange(render);
render();
saveProducts(items);
