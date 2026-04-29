import React from "react";

export default function Hero() {
  return (
    <section style={{
      position: "relative", overflow: "hidden",
      padding: "5rem 2.5rem 4rem",
      background: "linear-gradient(135deg, #0e0e0e 0%, #161208 50%, #0e0e0e 100%)",
      borderBottom: "1px solid var(--border)",
    }}>
      {/* Decorative orbs */}
      <div style={{
        position: "absolute", top: "-20%", right: "5%",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-10%", left: "20%",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,169,110,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }}>
        <div style={{ maxWidth: 620 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "var(--accent-dim)", border: "1px solid rgba(200,169,110,0.25)",
            borderRadius: 100, padding: "4px 14px", marginBottom: "1.5rem",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "block" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              New Season Arrivals
            </span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 700, lineHeight: 1.1,
            letterSpacing: "-0.03em", marginBottom: "1.25rem",
          }}>
            Curated Objects<br />
            <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Worth Owning</span>
          </h1>

          <p style={{
            fontSize: "1.05rem", color: "var(--text-muted)",
            lineHeight: 1.7, maxWidth: 480, marginBottom: "2rem",
          }}>
            A thoughtfully selected collection of watches, audio gear, home objects,
            and fashion for those who appreciate quality over quantity.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "12+ Categories", icon: "◈" },
              { label: "Free Shipping ₹999+", icon: "◎" },
              { label: "Easy Returns", icon: "◐" },
            ].map((badge) => (
              <span key={badge.label} style={{
                display: "flex", alignItems: "center", gap: 6,
                fontSize: 13, color: "var(--text-muted)",
                padding: "0.4rem 0.8rem",
                background: "var(--bg3)", border: "1px solid var(--border)",
                borderRadius: 100,
              }}>
                <span style={{ color: "var(--accent)", fontSize: 14 }}>{badge.icon}</span>
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
