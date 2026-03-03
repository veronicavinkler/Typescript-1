export const categories = [
    { id: 1, name: "Electronics", description: "Devices and gadgets" },
    { id: 2, name: "Clothing", description: "Apparel and accessories" },
    { id: 3, name: "Home Appliances", description: "Appliances for home use" }
];
export const products = [
    {
        id: 1,
        name: "Phone",
        description: "A smartphone with a sleek design and powerful features.",
        price: 699.99,
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
        category: categories[2],
        specifications: {
            power: "500W",
            capacity: "1.5 liters"
        }
    }
];
