import { products } from "../data/storeData";
const title = document.createElement("h1");
title.textContent = "All Product";
document.body.appendChild(title);
function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "card";
    card.style.width = "18rem";
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    return card;
}
products.forEach(p => {
    // log as before…
    console.log(`ID: ${p.id}`);
    // append the card to the page
    document.body.appendChild(createProductCard(p));
});
