import { Category } from "../models/Category";
import { Product } from "../models/Product";

export type StockStatus = "OUT" | "LOW" | "IN_STOCK";
export type SortMode = "name_asc" | "price_asc" | "price_desc" | "stock_desc";

export interface ProductListComponent {
    onFiltersChange: (handler: () => void) => void;
    getFilterValues: () => {
        category: "all" | number;
        status: "all" | StockStatus;
        sort: SortMode;
    };
    renderRows: (items: Product[]) => void;
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

const formatSpecs = (specs?: Record<string, string | number>): string => {
    if (!specs) {
        return "-";
    }

    return Object.entries(specs)
        .map(([key, value]) => `${key}=${String(value)}`)
        .join(", ");
};

export const createProductList = (
    mount: HTMLElement,
    categories: Category[],
    getStockStatus: (stock: number) => StockStatus
): ProductListComponent => {
    const controls = document.createElement("div");
    controls.className = "grid";
    mount.appendChild(controls);

    const filterCategory = document.createElement("select");
    const filterStatus = document.createElement("select");
    const sortSelect = document.createElement("select");

    const allCategories = document.createElement("option");
    allCategories.value = "all";
    allCategories.textContent = "All categories";
    filterCategory.appendChild(allCategories);

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

    controls.appendChild(createField("Filter category", filterCategory, "wide"));
    controls.appendChild(createField("Filter stock", filterStatus, "wide"));
    controls.appendChild(createField("Sort", sortSelect, "wide"));

    const tableWrap = document.createElement("div");
    tableWrap.className = "table-wrap";
    mount.appendChild(tableWrap);

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

    return {
        onFiltersChange: (handler) => {
            [filterCategory, filterStatus, sortSelect].forEach((control) => {
                control.addEventListener("change", handler);
            });
        },
        getFilterValues: () => ({
            category: filterCategory.value === "all" ? "all" : Number(filterCategory.value),
            status: filterStatus.value === "all" ? "all" : (filterStatus.value as StockStatus),
            sort: sortSelect.value as SortMode
        }),
        renderRows: (items) => {
            tbody.innerHTML = "";

            items.forEach((item) => {
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
        }
    };
};
