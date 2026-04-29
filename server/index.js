const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const productsPath = path.join(__dirname, "products.json");
let orders = [];

// ─── Products ───────────────────────────────────────────────────────────────

app.get("/api/products", (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
  const { category, search, sort, minPrice, maxPrice } = req.query;

  let result = [...products];

  if (category && category !== "All") {
    result = result.filter((p) => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (minPrice) result = result.filter((p) => p.price >= Number(minPrice));
  if (maxPrice) result = result.filter((p) => p.price <= Number(maxPrice));

  if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
  if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
  if (sort === "newest") result.sort((a, b) => b.id - a.id);

  res.json(result);
});

app.get("/api/products/:id", (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json(product);
});

app.get("/api/categories", (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  res.json(categories);
});

// ─── Orders ─────────────────────────────────────────────────────────────────

app.post("/api/orders", (req, res) => {
  const { items, customer, total } = req.body;

  if (!items || !customer || !total) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const order = {
    id: `ORD-${Date.now()}`,
    items,
    customer,
    total,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  console.log(`✅ New order: ${order.id} — ₹${total}`);
  res.status(201).json({ success: true, orderId: order.id });
});

// ─── Health ──────────────────────────────────────────────────────────────────

app.get("/api/health", (_, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`🚀 ShopWave API running → http://localhost:${PORT}`);
});
