export function FiltersPanel({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  inStockOnly,
  onInStockOnlyChange,
  sort,
  onSortChange,
  onReset,
}) {
  return (
    <section className="mt-4 p-3 border border-gray-700 rounded-lg">
      <h2 className="mt-0 text-xl font-bold mb-3">Controles</h2>

      <div className="grid gap-3">
        <label className="flex flex-col">
          <span className="mb-1 text-sm font-medium">Buscar por nombre:</span>
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Ej: monitor, ssd..."
            className="block w-full p-2 bg-gray-800 border border-gray-600 rounded"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 text-sm font-medium">Categoría:</span>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="block w-full p-2 bg-gray-800 border border-gray-600 rounded"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "Todas" : c}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockOnlyChange(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium">Solo con stock</span>
        </label>

        <label className="flex flex-col">
          <span className="mb-1 text-sm font-medium">Orden:</span>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="block w-full p-2 bg-gray-800 border border-gray-600 rounded"
          >
            <option value="none">Sin ordenar</option>
            <option value="priceAsc">Precio final: menor → mayor</option>
            <option value="priceDesc">Precio final: mayor → menor</option>
          </select>
        </label>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={onReset}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors text-sm font-medium"
          >
            Reset filtros
          </button>
        </div>
      </div>
    </section>
  );
}
