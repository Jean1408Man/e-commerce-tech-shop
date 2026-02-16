import { useMemo } from "react";
import { byCategory, onlyInStock, withFinalPrice } from "../utils/productTransforms";

export function useVisibleProducts(products, { search, category, inStockOnly, sort }) {
  // Enriquecemos una sola vez mientras "products" sea el mismo array (referencia)
  const enriched = useMemo(() => withFinalPrice(products), [products]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(enriched.map((p) => p.category)));
    unique.sort();
    return ["all", ...unique];
  }, [enriched]);

  const visibleProducts = useMemo(() => {
    let result = enriched;

    if (category !== "all") result = byCategory(result, category);
    if (inStockOnly) result = onlyInStock(result);

    const q = search.trim().toLowerCase();
    if (q) result = result.filter((p) => p.name.toLowerCase().includes(q));

    if (sort === "priceAsc") result = [...result].sort((a, b) => a.finalPrice - b.finalPrice);
    if (sort === "priceDesc") result = [...result].sort((a, b) => b.finalPrice - a.finalPrice);

    return result;
  }, [enriched, category, inStockOnly, search, sort]);

  return { enriched, categories, visibleProducts };
}
