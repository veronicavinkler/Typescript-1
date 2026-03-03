import { products, categories } from "../data/storeData";

const title = document.createElement("h1");
title.textContent = "All Product";
document.body.appendChild(title);

function createProductCard(product: typeof products[0]) {
    const card = document.createElement("div");
    card.style.border = "1px solid #ccc";
    card.style.padding = "10px";
    card.style.margin = "10px";

    const name = document.createElement("h2");
    name.textContent = product.name;
    card.appendChild(name);

    const description = document.createElement("p");
    description.textContent = product.description;
    card.appendChild(description);

    const price = document.createElement("p");
    price.textContent = `Price: $${product.price}`;
    card.appendChild(price);

    const category = document.createElement("p");
    category.textContent = `Category: ${product.category.name}`;
    card.appendChild(category);

    if (product.specifications) {
        const specsTitle = document.createElement("h3");
        specsTitle.textContent = "Specifications:";
        card.appendChild(specsTitle);
        const specsList = document.createElement("ul");
        for (const [key, value] of Object.entries(product.specifications)) {
            const specItem = document.createElement("li");
            specItem.textContent = `${key}: ${value}`;
            specsList.appendChild(specItem);
        }
        card.appendChild(specsList);
    }
    return card;
}

products.forEach(p => {
    console.log(`ID: ${p.id}`);
    console.log(`Name: ${p.name}`);
    console.log(`Description: ${p.description}`);
    console.log(`Price: $${p.price}`);
    console.log(`Category: ${p.category.name}`);
    if (p.specifications) {
        console.log("Specifications:");
        for (const [key, value] of Object.entries(p.specifications)) {
            console.log(`  - ${key}: ${value}`);
        }
    }
    console.log("-----------------------------");
});