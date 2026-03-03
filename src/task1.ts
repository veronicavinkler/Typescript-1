import {products, categories } from "./data/storeData";

//Task 1
console.log("All products:");
products.forEach(p => {
    console.log("ID: ${p.id}");
    console.log("Name: ${p.name}");
    console.log("Description: ${p.description}");
    console.log("Price: $${p.price}");
    console.log("Category: ${p.category.name}");
    if (p.specifications) {
        console.log("Specifications:");
        for (const [key, value] of Object.entries(p.specifications)) {
            console.log("  - ${key}: ${value}");
        }
    }
    console.log("-----------------------------");
});

//Task 2
console.log("All categories:");
categories.forEach(c => {
    console.log("ID: ${c.id}");
    console.log("Name: ${c.name}");
    console.log("Description: ${c.description}");
    console.log("-----------------------------");
});