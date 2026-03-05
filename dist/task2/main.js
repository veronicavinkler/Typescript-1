import { categories, products, warehouseStocks } from "../data/storeData.js";
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
const toStored = (item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    categoryId: item.category.id,
    stock: item.stock,
    specifications: item.specifications
});
const fromStored = (item) => {
    const category = categories.find((entry) => entry.id === item.categoryId) ?? categories[0];
    return {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        category,
        stock: item.stock,
        specifications: item.specifications
    };
};
const loadInitialProducts = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
        const parsed = JSON.parse(raw);
        return parsed.map(fromStored);
    }
    return products.map((product) => {
        const stock = warehouseStocks
            .filter((entry) => entry.product.id === product.id)
            .reduce((sum, entry) => sum + entry.quantity, 0);
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            stock,
            specifications: product.specifications
        };
    });
};
const saveProducts = (items) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.map(toStored)));
};
const parseSpecs = (text) => {
    const trimmed = text.trim();
    if (!trimmed) {
        return undefined;
    }
    const entries = trimmed
        .split(",")
        .map((chunk) => chunk.trim())
        .filter((chunk) => chunk.includes("="));
    const result = {};
    entries.forEach((entry) => {
        const [key, ...valueParts] = entry.split("=");
        const value = valueParts.join("=").trim();
        if (key.trim() && value) {
            result[key.trim()] = value;
        }
    });
    return Object.keys(result).length > 0 ? result : undefined;
};
const formatSpecs = (specs) => {
    if (!specs) {
        return "-";
    }
    return Object.entries(specs)
        .map(([key, value]) => `${key}=${String(value)}`)
        .join(", ");
};
let items = loadInitialProducts();
const app = document.createElement("main");
app.className = "app";
document.body.appendChild(app);
const style = document.createElement("style");
style.textContent = `
:root {
    --bg: #456171;
    --surface: #ffffff;
    --ink: #1d2935;
    --muted: #88a0a8;
    --accent: #88a0a8;
    --accent-2: #f4a259;
    --line: #88a0a8;
}
* { box-sizing: border-box; }
body {
    margin: 0;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    color: var(--ink);
    background: var(--bg);
}
.app {
    max-width: 1100px;
    margin: 0 auto;
    padding: 24px 16px 36px;
}
.hero {
    background: transparent;
    color: #fff;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 16px;
}
.hero h1 { margin: 0 0 8px; }
.hero p { margin: 0; opacity: 0.9; }
.panel {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 14px;
    margin-bottom: 14px;
}
.grid {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 10px;
}
.grid .full { grid-column: span 6; }
.grid .wide { grid-column: span 2; }
label { font-size: 13px; color: var(--muted); display: block; margin-bottom: 4px; }
input, select, button {
    width: 100%;
    padding: 10px 11px;
    border: 1px solid var(--line);
    border-radius: 10px;
    font-size: 14px;
}
button {
    background: var(--accent);
    color: #fff;
    border: 0;
    cursor: pointer;
    font-weight: 600;
}
button:hover { filter: brightness(0.95); }
.table-wrap {
    overflow-x: auto;
}
table {
    width: 100%;
    border-collapse: collapse;
    min-width: 920px;
}
th, td {
    border-bottom: 1px solid var(--line);
    text-align: left;
    padding: 10px 8px;
    vertical-align: top;
}
th { font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--muted); }
.status {
    display: inline-block;
    padding: 3px 8px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
}
.status.OUT { background: #fe5f55; color: #ffffff; }
.status.LOW { background: #e59859; color: #ffffff; }
.status.IN_STOCK { background: #88a171; color: #ffffff; }
@media (max-width: 850px) {
    .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .grid .wide, .grid .full { grid-column: span 2; }
}
`;
document.head.appendChild(style);
const hero = document.createElement("section");
hero.className = "hero";
hero.innerHTML = `<h1>Product Stock</h1><p>Add and filter products and keep the info in local storage</p>`;
app.appendChild(hero);
const formPanel = document.createElement("section");
formPanel.className = "panel";
app.appendChild(formPanel);
const formTitle = document.createElement("h2");
formTitle.textContent = "Add Product";
formPanel.appendChild(formTitle);
const form = document.createElement("form");
form.className = "grid";
formPanel.appendChild(form);
const nameInput = document.createElement("input");
const descInput = document.createElement("input");
const priceInput = document.createElement("input");
const stockInput = document.createElement("input");
const categoryInput = document.createElement("select");
const specsInput = document.createElement("input");
const addButton = document.createElement("button");
nameInput.required = true;
nameInput.placeholder = "Name";
descInput.required = true;
descInput.placeholder = "Description";
priceInput.required = true;
priceInput.type = "number";
priceInput.min = "0";
priceInput.step = "0.01";
priceInput.placeholder = "Price";
stockInput.required = true;
stockInput.type = "number";
stockInput.min = "0";
stockInput.step = "1";
stockInput.placeholder = "Stock";
specsInput.placeholder = "cpu=i7, ram=16, weight=1.4";
addButton.type = "submit";
addButton.textContent = "Add Product";
categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = String(category.id);
    option.textContent = category.name;
    categoryInput.appendChild(option);
});
const field = (labelText, control, className) => {
    const wrapper = document.createElement("div");
    if (className) {
        wrapper.className = className;
    }
    const label = document.createElement("label");
    label.textContent = labelText;
    wrapper.appendChild(label);
    wrapper.appendChild(control);
    return wrapper;
};
form.appendChild(field("Product", nameInput));
form.appendChild(field("Description", descInput));
form.appendChild(field("Price", priceInput));
form.appendChild(field("Stock", stockInput));
form.appendChild(field("Category", categoryInput));
form.appendChild(field("Specs (key=value)", specsInput, "wide"));
form.appendChild(field("", addButton));
const listPanel = document.createElement("section");
listPanel.className = "panel";
app.appendChild(listPanel);
const controls = document.createElement("div");
controls.className = "grid";
listPanel.appendChild(controls);
const filterCategory = document.createElement("select");
const filterStatus = document.createElement("select");
const sortSelect = document.createElement("select");
const catAll = document.createElement("option");
catAll.value = "all";
catAll.textContent = "All categories";
filterCategory.appendChild(catAll);
categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = String(category.id);
    option.textContent = category.name;
    filterCategory.appendChild(option);
});
[
    { value: "all", label: "All stock statuses" },
    { value: "OUT", label: "OUT" },
    { value: "LOW", label: "LOW" },
    { value: "IN_STOCK", label: "IN_STOCK" }
].forEach((item) => {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.label;
    filterStatus.appendChild(option);
});
[
    { value: "name_asc", label: "Name A-Z" },
    { value: "price_asc", label: "Price low-high" },
    { value: "price_desc", label: "Price high-low" },
    { value: "stock_desc", label: "Stock high-low" }
].forEach((item) => {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.label;
    sortSelect.appendChild(option);
});
controls.appendChild(field("Filter category", filterCategory, "wide"));
controls.appendChild(field("Filter stock", filterStatus, "wide"));
controls.appendChild(field("Sort", sortSelect, "wide"));
const tableWrap = document.createElement("div");
tableWrap.className = "table-wrap";
listPanel.appendChild(tableWrap);
const table = document.createElement("table");
tableWrap.appendChild(table);
const thead = document.createElement("thead");
const headRow = document.createElement("tr");
["Product", "Category", "Price", "Available", "Status", "Specs / Description"].forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    headRow.appendChild(th);
});
thead.appendChild(headRow);
const tbody = document.createElement("tbody");
table.appendChild(thead);
table.appendChild(tbody);
const render = () => {
    const categoryFilterValue = filterCategory.value;
    const statusFilterValue = filterStatus.value;
    const sortValue = sortSelect.value;
    let result = [...items];
    if (categoryFilterValue !== "all") {
        const categoryId = Number(categoryFilterValue);
        result = result.filter((item) => item.category.id === categoryId);
    }
    if (statusFilterValue !== "all") {
        result = result.filter((item) => getStockStatus(item.stock) === statusFilterValue);
    }
    result.sort((a, b) => {
        switch (sortValue) {
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
    tbody.innerHTML = "";
    result.forEach((item) => {
        const row = document.createElement("tr");
        const status = getStockStatus(item.stock);
        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;
        const categoryCell = document.createElement("td");
        categoryCell.textContent = item.category.name;
        const priceCell = document.createElement("td");
        priceCell.textContent = item.price.toFixed(2);
        const stockCell = document.createElement("td");
        stockCell.textContent = String(item.stock);
        const statusCell = document.createElement("td");
        const statusBadge = document.createElement("span");
        statusBadge.className = `status ${status}`;
        statusBadge.textContent = status;
        statusCell.appendChild(statusBadge);
        const detailsCell = document.createElement("td");
        detailsCell.textContent = item.specifications ? formatSpecs(item.specifications) : item.description;
        row.appendChild(nameCell);
        row.appendChild(categoryCell);
        row.appendChild(priceCell);
        row.appendChild(stockCell);
        row.appendChild(statusCell);
        row.appendChild(detailsCell);
        tbody.appendChild(row);
    });
};
[filterCategory, filterStatus, sortSelect].forEach((control) => {
    control.addEventListener("change", render);
});
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const description = descInput.value.trim();
    const price = Number(priceInput.value);
    const stock = Number(stockInput.value);
    const categoryId = Number(categoryInput.value);
    const category = categories.find((entry) => entry.id === categoryId);
    if (!name || !description || Number.isNaN(price) || Number.isNaN(stock) || !category) {
        return;
    }
    const nextId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    const nextItem = {
        id: nextId,
        name,
        description,
        price,
        stock,
        category,
        specifications: parseSpecs(specsInput.value)
    };
    items = [...items, nextItem];
    saveProducts(items);
    form.reset();
    categoryInput.value = String(categories[0].id);
    render();
});
categoryInput.value = String(categories[0].id);
render();
saveProducts(items);
