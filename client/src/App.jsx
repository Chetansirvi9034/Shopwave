import React, { useState } from "react";
import { CartProvider } from "./context/CartContext";
import { useProducts, useCategories } from "./hooks/useApi";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300 }}>
      <div style={{
        width: 36, height: 36, border: "3px solid var(--border)",
        borderTopColor: "var(--accent)", borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
    </div>
  );
}

function Shop() {
  const [filters, setFilters] = useState({
    category: "All", sort: "newest", maxPrice: 500, search: "",
  });

  const { products, loading, error } = useProducts(filters);
  const categories = useCategories();

  const handleSearch = (q) => setFilters((f) => ({ ...f, search: q }));

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar onSearch={handleSearch} />
      <Hero />

      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "2.5rem 2.5rem 4rem" }}>
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start" }}>
          <Sidebar categories={categories} filters={filters} onChange={setFilters} />

          <div style={{ flex: 1 }}>
            {/* Results header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: "1.5rem",
            }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600 }}>
                  {filters.category === "All" ? "All Products" : filters.category}
                </h2>
                {!loading && (
                  <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>
                    {products.length} item{products.length !== 1 ? "s" : ""} found
                  </p>
                )}
              </div>
            </div>

            {loading && <Spinner />}

            {error && (
              <div style={{
                padding: "2rem", background: "var(--bg2)", border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)", textAlign: "center", color: "var(--danger)",
              }}>
                {error}
              </div>
            )}

            {!loading && !error && products.length === 0 && (
              <div style={{
                padding: "4rem", textAlign: "center", color: "var(--text-muted)",
              }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                <p style={{ fontSize: "1.1rem" }}>No products found</p>
                <p style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your filters</p>
              </div>
            )}

            {!loading && !error && (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "1.25rem",
              }}>
                {products.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    style={{ animation: `fadeUp 0.4s ease ${i * 0.05}s both` }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid var(--border)", padding: "2rem 2.5rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        color: "var(--text-dim)", fontSize: 13,
        maxWidth: 1400, margin: "0 auto",
      }}>
        <span style={{ fontFamily: "var(--font-display)", color: "var(--text-muted)", fontSize: 16 }}>
          Shop<span style={{ color: "var(--accent)" }}>Wave</span>
        </span>
        <span>© 2025 ShopWave. All rights reserved.</span>
        <span style={{ display: "flex", gap: 16 }}>
          {["Privacy", "Terms", "Support"].map((l) => (
            <span key={l} style={{ cursor: "pointer", transition: "color var(--transition)" }}
              onMouseEnter={(e) => e.target.style.color = "var(--accent)"}
              onMouseLeave={(e) => e.target.style.color = "var(--text-dim)"}
            >{l}</span>
          ))}
        </span>
      </footer>

      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Shop />
    </CartProvider>
  );
}
