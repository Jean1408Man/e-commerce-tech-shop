import { ProductItem } from "./ProductItem";

export function ProductList({ products }) {
  if (products.length === 0) {
    return <p>No hay productos con esos filtros 😅</p>;
  }

  return (
    <ul>
      {products.map((p) => (
        <ProductItem key={p.id} product={p} />
      ))}
    </ul>
  );
}
