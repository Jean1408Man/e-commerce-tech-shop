import { ProductItem } from "./ProductItem";

export function ProductList({ products }) {
  if (products.length === 0) {
    return (
      <p className="text-gray-400 py-8 text-center">
        No se han encontrado productos que coincidan con la búsqueda.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((p) => (
        <ProductItem key={p.id} product={p} />
      ))}
    </div>
  );
}
