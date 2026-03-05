import { products, suppliers, warehouseStocks, reviews, discountRules } from "./data/storeData.js";
const formatPrice = (value) => value.toFixed(2);
const getStockStatus = (available) => {
    if (available === 0) {
        return "OUT";
    }
    if (available <= 2) {
        return "LOW";
    }
    return "IN_STOCK";
};
const getAvgRatingText = (productId) => {
    const productReviews = reviews.filter((review) => review.product.id === productId);
    if (productReviews.length === 0) {
        return "no reviews";
    }
    const avgRating = productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length;
    return avgRating.toFixed(2);
};
const getBestDiscountPercent = (categoryId, avgRatingText) => {
    const avgRatingValue = avgRatingText === "no reviews" ? null : Number(avgRatingText);
    const applicableRules = discountRules.filter((rule) => {
        if (rule.category.id !== categoryId) {
            return false;
        }
        if (rule.minRating === undefined) {
            return true;
        }
        return avgRatingValue !== null && avgRatingValue >= rule.minRating;
    });
    return applicableRules.reduce((best, rule) => {
        return rule.percentage > best ? rule.percentage : best;
    }, 0);
};
const pad = (text, width) => text.padEnd(width, " ");
console.log(`${pad("product", 16)} | ${pad("category", 16)} | ${pad("supplier", 20)} | ${pad("available", 18)} | ${pad("rating", 10)} | ${pad("specs/description", 55)} | price`);
console.log("-".repeat(170));
products.forEach((product) => {
    const productStocks = warehouseStocks.filter((stock) => stock.product.id === product.id);
    const available = productStocks.reduce((sum, stock) => sum + stock.quantity, 0);
    const stockStatus = getStockStatus(available);
    const supplierName = suppliers
        .filter((supplier) => supplier.products.some((supplierProduct) => supplierProduct.id === product.id))
        .map((supplier) => supplier.name)
        .join(", ") || "-";
    const avgRatingText = getAvgRatingText(product.id);
    const bestDiscountPercent = getBestDiscountPercent(product.category.id, avgRatingText);
    const discountedPrice = product.price * (1 - bestDiscountPercent / 100);
    const specsOrDescription = product.specifications
        ? `specs: ${Object.entries(product.specifications)
            .map(([key, value]) => `${key}=${String(value)}`)
            .join(", ")}`
        : `description: ${product.description}`;
    const line = `${pad(product.name, 16)} | ` +
        `${pad(product.category.name, 16)} | ` +
        `${pad(supplierName, 20)} | ` +
        `${pad(`${available} (${stockStatus})`, 18)} | ` +
        `${pad(avgRatingText, 10)} | ` +
        `${pad(specsOrDescription, 55)} | ` +
        `${formatPrice(product.price)} -> ${formatPrice(discountedPrice)}`;
    console.log(line);
});
