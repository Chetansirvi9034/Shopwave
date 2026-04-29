import { useState, useEffect, useCallback } from "react";

const BASE = "/api";

export function useProducts(filters) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.category && filters.category !== "All") params.set("category", filters.category);
      if (filters.search) params.set("search", filters.search);
      if (filters.sort) params.set("sort", filters.sort);
      if (filters.minPrice != null) params.set("minPrice", filters.minPrice);
      if (filters.maxPrice != null) params.set("maxPrice", filters.maxPrice);

      const res = await fetch(`${BASE}/products?${params}`);
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  return { products, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState(["All"]);
  useEffect(() => {
    fetch(`${BASE}/categories`)
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {});
  }, []);
  return categories;
}

export async function placeOrder(payload) {
  const res = await fetch(`${BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
