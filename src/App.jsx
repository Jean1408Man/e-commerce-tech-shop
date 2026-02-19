import { FiltersPanel } from "./components/FiltersPanel";
import { ProductList } from "./components/ProductList";
import { useVisibleProducts } from "./hooks/useVisibleProducts";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { useProducts } from "./hooks/useProducts";

export default function App() {
  const { products, status, error } = useProducts();

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

  const { categories, visibleProducts } = useVisibleProducts(products, {
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
      <h1>Catálogo — filtros + fetch</h1>

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
        {status === "loading" && (
          <p>Cargando productos… (respira, no es un bug 😄)</p>
        )}

        {status === "error" && (
          <p className="text-red-400">
            Error cargando productos: {error?.message}
          </p>
        )}

        {status === "success" && (
          <>
            <h2>Resultados ({visibleProducts.length})</h2>
            <ProductList products={visibleProducts} />
          </>
        )}
      </section>
    </div>
  );
}
