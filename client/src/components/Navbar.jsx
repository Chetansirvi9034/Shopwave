import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function Navbar({ onSearch }) {
  const { count, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSearch = (e) => {
    setQ(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(14,14,14,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "all 0.3s ease",
      padding: "0 2.5rem",
    }}>
      <div style={{
        maxWidth: 1400, margin: "0 auto",
        display: "flex", alignItems: "center",
        height: 68, gap: "2rem",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem", flexShrink: 0 }}>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.6rem", fontWeight: 700,
            color: "var(--text)", letterSpacing: "-0.02em",
          }}>Shop</span>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.6rem", fontWeight: 400,
            color: "var(--accent)",
          }}>Wave</span>
        </div>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: 480, position: "relative" }}>
          <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: 0.4 }}
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            value={q}
            onChange={handleSearch}
            placeholder="Search products..."
            style={{
              width: "100%", height: 40,
              background: "var(--bg3)", border: "1px solid var(--border)",
              borderRadius: "var(--radius)", color: "var(--text)",
              paddingLeft: 36, paddingRight: 16, fontSize: 14,
              transition: "border-color var(--transition)",
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
            onBlur={(e) => e.target.style.borderColor = "var(--border)"}
          />
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Nav links */}
        {["New In", "Sale", "About"].map((link) => (
          <span key={link} style={{
            fontSize: 13, fontWeight: 500, color: "var(--text-muted)",
            cursor: "pointer", letterSpacing: "0.04em", textTransform: "uppercase",
            transition: "color var(--transition)",
          }}
          onMouseEnter={(e) => e.target.style.color = "var(--text)"}
          onMouseLeave={(e) => e.target.style.color = "var(--text-muted)"}
          >{link}</span>
        ))}

        {/* Cart button */}
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "relative", background: "var(--accent-dim)",
            border: "1px solid rgba(200,169,110,0.25)",
            borderRadius: "var(--radius)", padding: "0.5rem 1rem",
            color: "var(--accent)", fontSize: 13, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 8,
            transition: "all var(--transition)",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "var(--accent)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "var(--accent-dim)"}
          onMouseEnterCapture={(e) => e.currentTarget.style.color = "var(--bg)"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          Cart
          {count > 0 && (
            <span style={{
              background: "var(--accent)", color: "var(--bg)",
              borderRadius: "50%", width: 18, height: 18,
              fontSize: 11, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{count}</span>
          )}
        </button>
      </div>
    </nav>
  );
}
