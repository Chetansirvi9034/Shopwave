import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const badgeColors = {
  "Best Seller": { bg: "#c8a96e22", border: "#c8a96e55", text: "#c8a96e" },
  "Sale": { bg: "#e0525222", border: "#e0525255", text: "#e05252" },
  "New": { bg: "#52b78822", border: "#52b78855", text: "#52b788" },
};

function Stars({ rating }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="11" height="11" viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? "#c8a96e" : "none"}
          stroke="#c8a96e" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product, style }) {
  const { add } = useCart();
  const [hovered, setHovered] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAdd = async (e) => {
    e.stopPropagation();
    setAdding(true);
    add(product);
    setTimeout(() => setAdding(false), 600);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--bg2)",
        border: `1px solid ${hovered ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.5)" : "none",
        cursor: "pointer",
        ...style,
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden", background: "var(--bg3)" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        {/* Badge */}
        {product.badge && (() => {
          const c = badgeColors[product.badge] || badgeColors["New"];
          return (
            <span style={{
              position: "absolute", top: 12, left: 12,
              background: c.bg, border: `1px solid ${c.border}`,
              color: c.text, fontSize: 11, fontWeight: 600,
              padding: "3px 8px", borderRadius: 4,
              letterSpacing: "0.04em", textTransform: "uppercase",
            }}>{product.badge}</span>
          );
        })()}
        {/* Discount */}
        {discount && (
          <span style={{
            position: "absolute", top: 12, right: 12,
            background: "var(--danger)", color: "#fff",
            fontSize: 11, fontWeight: 700,
            padding: "3px 8px", borderRadius: 4,
          }}>-{discount}%</span>
        )}
        {/* Quick add overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "1rem",
          background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
          transform: hovered ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.25s ease",
        }}>
          <button
            onClick={handleAdd}
            style={{
              width: "100%", height: 40,
              background: adding ? "var(--success)" : "var(--accent)",
              color: adding ? "#fff" : "var(--bg)",
              border: "none", borderRadius: "var(--radius)",
              fontSize: 13, fontWeight: 600,
              transition: "background var(--transition)",
            }}
          >
            {adding ? "✓ Added!" : "Quick Add"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "1rem" }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
          {product.category}
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600, marginBottom: 6, lineHeight: 1.3 }}>
          {product.name}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <Stars rating={product.rating} />
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>({product.reviews})</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--accent)" }}>
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span style={{ fontSize: 13, color: "var(--text-dim)", textDecoration: "line-through" }}>
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
