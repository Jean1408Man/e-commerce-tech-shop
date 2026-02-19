import { PRODUCTS } from "./data/products";
import { FiltersPanel } from "./components/FiltersPanel";
import { ProductList } from "./components/ProductList";
import { useVisibleProducts } from "./hooks/useVisibleProducts";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

export default function App() {
  const [search, setSearch] = useLocalStorageState("filters.search", "");
  const [category, setCategory] = useLocalStorageState(
    "filters.category",
    "all",
  );
  const [inStockOnly, setInStockOnly] = useLocalStorageState(
    "filters.inStockOnly",
    false,
  );
  const [sort, setSort] = useLocalStorageState("filters.sort", "none");

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
    // No hace falta hacer localStorage.removeItem aquí:
    // el hook detecta "volvió al initial" y borra la key automáticamente.
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
