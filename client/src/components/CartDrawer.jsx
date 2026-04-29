import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../hooks/useApi";

function CheckoutForm({ items, total, onSuccess, onBack }) {
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", pin: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.address || !form.city || !form.pin) {
      setError("Please fill all fields."); return;
    }
    setLoading(true); setError("");
    try {
      const res = await placeOrder({ items, customer: form, total });
      if (res.success) onSuccess(res.orderId);
      else setError("Order failed. Try again.");
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", height: 40, background: "var(--bg3)",
    border: "1px solid var(--border)", borderRadius: "var(--radius)",
    color: "var(--text)", padding: "0 12px", fontSize: 14, marginBottom: 10,
  };

  return (
    <div>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--accent)", fontSize: 13, marginBottom: 16, display: "flex", alignItems: "center", gap: 4 }}>
        ← Back to cart
      </button>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", marginBottom: 16 }}>Checkout</h3>
      <input placeholder="Full Name" style={inputStyle} value={form.name} onChange={(e) => set("name", e.target.value)} />
      <input placeholder="Email" style={inputStyle} value={form.email} onChange={(e) => set("email", e.target.value)} />
      <input placeholder="Address" style={inputStyle} value={form.address} onChange={(e) => set("address", e.target.value)} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <input placeholder="City" style={{ ...inputStyle, marginBottom: 0 }} value={form.city} onChange={(e) => set("city", e.target.value)} />
        <input placeholder="PIN Code" style={{ ...inputStyle, marginBottom: 0 }} value={form.pin} onChange={(e) => set("pin", e.target.value)} />
      </div>
      {error && <p style={{ color: "var(--danger)", fontSize: 12, marginTop: 8 }}>{error}</p>}
      <div style={{ marginTop: 16, padding: "12px 16px", background: "var(--bg3)", borderRadius: "var(--radius)", display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ color: "var(--text-muted)" }}>Order Total</span>
        <span style={{ fontWeight: 700, color: "var(--accent)" }}>₹{total.toLocaleString()}</span>
      </div>
      <button onClick={handleSubmit} disabled={loading} style={{
        width: "100%", height: 46, background: "var(--accent)",
        color: "var(--bg)", border: "none", borderRadius: "var(--radius)",
        fontSize: 15, fontWeight: 700, opacity: loading ? 0.6 : 1,
      }}>
        {loading ? "Placing Order…" : "Place Order →"}
      </button>
    </div>
  );
}

export default function CartDrawer() {
  const { items, total, count, isOpen, setIsOpen, remove, updateQty, clear } = useCart();
  const [view, setView] = useState("cart"); // cart | checkout | success
  const [orderId, setOrderId] = useState("");

  if (!isOpen) return null;

  const handleSuccess = (id) => {
    setOrderId(id);
    setView("success");
    clear();
  };

  return (
    <>
      {/* Backdrop */}
      <div onClick={() => { setIsOpen(false); setView("cart"); }}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, animation: "fadeIn 0.2s ease" }} />

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: 400,
        background: "var(--bg2)", borderLeft: "1px solid var(--border)",
        zIndex: 201, display: "flex", flexDirection: "column",
        animation: "slideRight 0.3s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: "var(--shadow-lg)",
      }}>
        {/* Header */}
        <div style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600 }}>
            {view === "cart" ? `Cart (${count})` : view === "checkout" ? "Checkout" : "Order Placed!"}
          </span>
          <button onClick={() => { setIsOpen(false); setView("cart"); }}
            style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 20, lineHeight: 1 }}>
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
          {view === "cart" && (
            items.length === 0
              ? <div style={{ textAlign: "center", paddingTop: "4rem", color: "var(--text-muted)" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🛒</div>
                  <p>Your cart is empty</p>
                </div>
              : items.map((item) => (
                <div key={item.id} style={{
                  display: "flex", gap: 12, marginBottom: 16, paddingBottom: 16,
                  borderBottom: "1px solid var(--border)",
                }}>
                  <img src={item.image} alt={item.name}
                    style={{ width: 72, height: 72, objectFit: "cover", borderRadius: "var(--radius)", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.name}</div>
                    <div style={{ color: "var(--accent)", fontWeight: 700, marginBottom: 8 }}>₹{item.price.toLocaleString()}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button onClick={() => updateQty(item.id, item.qty - 1)}
                        style={{ width: 24, height: 24, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 4, color: "var(--text)", fontSize: 14 }}>−</button>
                      <span style={{ fontSize: 14, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}
                        style={{ width: 24, height: 24, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 4, color: "var(--text)", fontSize: 14 }}>+</button>
                      <button onClick={() => remove(item.id)}
                        style={{ marginLeft: "auto", background: "none", border: "none", color: "var(--danger)", fontSize: 13, cursor: "pointer" }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))
          )}

          {view === "checkout" && (
            <CheckoutForm items={items} total={total}
              onSuccess={handleSuccess} onBack={() => setView("cart")} />
          )}

          {view === "success" && (
            <div style={{ textAlign: "center", paddingTop: "3rem" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: 8 }}>Order Confirmed!</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: 16, fontSize: 14 }}>
                Your order has been placed successfully.
              </p>
              <div style={{
                background: "var(--accent-dim)", border: "1px solid rgba(200,169,110,0.3)",
                borderRadius: "var(--radius)", padding: "0.75rem 1rem",
                color: "var(--accent)", fontWeight: 600, marginBottom: 24, fontSize: 14,
              }}>
                Order ID: {orderId}
              </div>
              <button onClick={() => { setIsOpen(false); setView("cart"); }}
                style={{
                  padding: "0.7rem 2rem", background: "var(--accent)",
                  color: "var(--bg)", border: "none", borderRadius: "var(--radius)",
                  fontSize: 14, fontWeight: 700,
                }}>
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {view === "cart" && items.length > 0 && (
          <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ color: "var(--text-muted)" }}>Subtotal</span>
              <span style={{ fontWeight: 700, color: "var(--accent)", fontSize: "1.1rem" }}>₹{total.toLocaleString()}</span>
            </div>
            <button onClick={() => setView("checkout")} style={{
              width: "100%", height: 46, background: "var(--accent)",
              color: "var(--bg)", border: "none", borderRadius: "var(--radius)",
              fontSize: 15, fontWeight: 700,
            }}>
              Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
