import { useState } from "react";
import { PRODUCTS } from "./data/products";
import { FiltersPanel } from "./components/FiltersPanel";
import { ProductList } from "./components/ProductList";
import { useVisibleProducts } from "./hooks/useVisibleProducts";

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState("none");

  const { categories, visibleProducts } = useVisibleProducts(PRODUCTS, {
    search,
    category,
    inStockOnly,
    sort,
  });

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setInStockOnly(false);
    setSort("none");
  };

  return (
    <div className="font-sans p-4 max-w-[900px] mx-auto">
      <h1>Día 2 — Estado + Eventos (Refactor a componentes)</h1>

      <FiltersPanel
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
        inStockOnly={inStockOnly}
        onInStockOnlyChange={setInStockOnly}
        sort={sort}
        onSortChange={setSort}
        onReset={handleReset}
      />

      <section className="mt-4">
        <h2>Resultados ({visibleProducts.length})</h2>
        <ProductList products={visibleProducts} />
      </section>
    </div>
  );
}
