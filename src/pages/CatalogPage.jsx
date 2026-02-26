import { FiltersPanel } from "../components/FiltersPanel";
import { ProductList } from "../components/ProductList";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useVisibleProducts } from "../hooks/useVisibleProducts";

export function CatalogPage({ products, status, error }) {
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
    <>
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
          <p className="text-gray-400 animate-pulse">
            Cargando catálogo de productos...
          </p>
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
    </>
  );
}
