import React from "react";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
];

export default function Sidebar({ categories, filters, onChange }) {
  const setFilter = (key, val) => onChange({ ...filters, [key]: val });

  return (
    <aside style={{
      width: 220, flexShrink: 0,
      display: "flex", flexDirection: "column", gap: "2rem",
    }}>
      {/* Categories */}
      <div>
        <h3 style={{
          fontSize: 11, fontWeight: 600, color: "var(--text-muted)",
          textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem",
        }}>Category</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter("category", cat)}
              style={{
                textAlign: "left", padding: "0.5rem 0.75rem",
                background: filters.category === cat ? "var(--accent-dim)" : "transparent",
                border: `1px solid ${filters.category === cat ? "rgba(200,169,110,0.3)" : "transparent"}`,
                borderRadius: "var(--radius)",
                color: filters.category === cat ? "var(--accent)" : "var(--text-muted)",
                fontSize: 14, fontWeight: filters.category === cat ? 600 : 400,
                transition: "all var(--transition)",
              }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 style={{
          fontSize: 11, fontWeight: 600, color: "var(--text-muted)",
          textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem",
        }}>Sort By</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {sortOptions.map((opt) => (
            <button key={opt.value} onClick={() => setFilter("sort", opt.value)}
              style={{
                textAlign: "left", padding: "0.5rem 0.75rem",
                background: filters.sort === opt.value ? "var(--accent-dim)" : "transparent",
                border: `1px solid ${filters.sort === opt.value ? "rgba(200,169,110,0.3)" : "transparent"}`,
                borderRadius: "var(--radius)",
                color: filters.sort === opt.value ? "var(--accent)" : "var(--text-muted)",
                fontSize: 14, fontWeight: filters.sort === opt.value ? 600 : 400,
                transition: "all var(--transition)",
              }}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 style={{
          fontSize: 11, fontWeight: 600, color: "var(--text-muted)",
          textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem",
        }}>Max Price</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <input
            type="range" min={0} max={500} step={10}
            value={filters.maxPrice ?? 500}
            onChange={(e) => setFilter("maxPrice", Number(e.target.value))}
            style={{ accentColor: "var(--accent)", width: "100%" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-muted)" }}>
            <span>₹0</span>
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>
              ₹{(filters.maxPrice ?? 500).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => onChange({ category: "All", sort: "newest", maxPrice: 500, search: "" })}
        style={{
          padding: "0.6rem", background: "transparent",
          border: "1px solid var(--border)", borderRadius: "var(--radius)",
          color: "var(--text-muted)", fontSize: 13, fontWeight: 500,
          transition: "all var(--transition)",
        }}
        onMouseEnter={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.color = "var(--accent)"; }}
        onMouseLeave={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text-muted)"; }}
      >
        Reset Filters
      </button>
    </aside>
  );
}
