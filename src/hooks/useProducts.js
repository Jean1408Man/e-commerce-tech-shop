import { useEffect, useState } from "react";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setStatus("loading");
      setError(null);

      try {
        const res = await fetch("/products.json", {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status} al cargar products.json`);
        }

        const data = await res.json();

        // Validación mínima “anti datos chuecos”
        if (!Array.isArray(data)) {
          throw new Error("products.json no es un array");
        }

        setProducts(data);
        setStatus("success");
      } catch (err) {
        // Si abortamos por un unmount, no lo tratamos como error de UI
        if (err?.name === "AbortError") return;

        setError(err);
        setStatus("error");
      }
    }

    load();

    return () => controller.abort();
  }, []);

  return { products, status, error };
}
