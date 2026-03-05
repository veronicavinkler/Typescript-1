export interface Task2Layout {
    formMount: HTMLElement;
    listMount: HTMLElement;
}

export const createTask2Layout = (): Task2Layout => {
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
.table-wrap { overflow-x: auto; }
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
    .grid .wide { grid-column: span 2; }
}
`;
    document.head.appendChild(style);

    const hero = document.createElement("section");
    hero.className = "hero";
    hero.innerHTML = "<h1>Product Stock</h1><p>Add and filter products and keep the info in local storage</p>";
    app.appendChild(hero);

    const formPanel = document.createElement("section");
    formPanel.className = "panel";
    app.appendChild(formPanel);

    const listPanel = document.createElement("section");
    listPanel.className = "panel";
    app.appendChild(listPanel);

    return { formMount: formPanel, listMount: listPanel };
};
