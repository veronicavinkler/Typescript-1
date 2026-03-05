import { Category } from "../models/Category";

export interface ProductDraft {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;
    specifications?: Record<string, string>;
}

export interface ProductAddComponent {
    onSubmit: (handler: (input: ProductDraft) => void) => void;
}

const createField = (labelText: string, control: HTMLElement, className?: string): HTMLDivElement => {
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

const parseSpecs = (text: string): Record<string, string> | undefined => {
    const trimmed = text.trim();

    if (!trimmed) {
        return undefined;
    }

    const result: Record<string, string> = {};
    const entries = trimmed
        .split(",")
        .map((chunk) => chunk.trim())
        .filter((chunk) => chunk.includes("="));

    entries.forEach((entry) => {
        const [key, ...valueParts] = entry.split("=");
        const value = valueParts.join("=").trim();

        if (key.trim() && value) {
            result[key.trim()] = value;
        }
    });

    return Object.keys(result).length > 0 ? result : undefined;
};

export const createProductAdd = (mount: HTMLElement, categories: Category[]): ProductAddComponent => {
    const title = document.createElement("h2");
    title.textContent = "Add Product";
    mount.appendChild(title);

    const form = document.createElement("form");
    form.className = "grid";
    mount.appendChild(form);

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

    form.appendChild(createField("Product", nameInput));
    form.appendChild(createField("Description", descInput));
    form.appendChild(createField("Price", priceInput));
    form.appendChild(createField("Stock", stockInput));
    form.appendChild(createField("Category", categoryInput));
    form.appendChild(createField("Specs (key=value)", specsInput, "wide"));
    form.appendChild(createField("", addButton));

    categoryInput.value = String(categories[0]?.id ?? "");

    return {
        onSubmit: (handler) => {
            form.addEventListener("submit", (event) => {
                event.preventDefault();

                const name = nameInput.value.trim();
                const description = descInput.value.trim();
                const price = Number(priceInput.value);
                const stock = Number(stockInput.value);
                const categoryId = Number(categoryInput.value);

                if (!name || !description || Number.isNaN(price) || Number.isNaN(stock)) {
                    return;
                }

                handler({
                    name,
                    description,
                    price,
                    stock,
                    categoryId,
                    specifications: parseSpecs(specsInput.value)
                });

                form.reset();
                categoryInput.value = String(categories[0]?.id ?? "");
            });
        }
    };
};
