import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  findById,
  formatMoney,
  withFinalPrice,
} from "../utils/productTransforms";

export function ProductDetail({ products, status, error }) {
  const { id } = useParams();

  // Aseguramos finalPrice también en detalle
  const enriched = useMemo(() => withFinalPrice(products), [products]);
  const product = useMemo(() => findById(enriched, id), [enriched, id]);

  if (status === "loading") {
    return <p>Cargando producto…</p>;
  }

  if (status === "error") {
    return (
      <p className="text-red-400">Error cargando productos: {error?.message}</p>
    );
  }

  if (status === "success" && !product) {
    return (
      <div className="mt-4">
        <h2>404 — Producto no encontrado</h2>
        <p>
          No existe un producto con id: <code>{id}</code>
        </p>
        <Link className="underline" to="/">
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="mt-4">
      <Link className="underline" to="/">
        ← Volver
      </Link>

      <h2 className="mt-3 text-2xl font-bold">{product.name}</h2>

      <div className="mt-2 p-3 border border-gray-700 rounded-lg">
        <p>
          <strong>ID:</strong> {product.id}
        </p>
        <p>
          <strong>Categoría:</strong> {product.category}
        </p>
        <p>
          <strong>Precio base:</strong> {formatMoney(product.price)}
        </p>
        <p>
          <strong>Descuento:</strong> {(product.discount * 100).toFixed(0)}%
        </p>
        <p>
          <strong>Precio final:</strong> {formatMoney(product.finalPrice)}
        </p>

        <p
          className={
            product.stock === 0 ? "text-red-400 font-bold" : "text-gray-300"
          }
        >
          {product.stock > 0 ? `Stock: ${product.stock}` : "SIN STOCK"}
        </p>
      </div>
    </div>
  );
}
