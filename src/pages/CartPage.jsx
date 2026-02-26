import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useCart } from "../context/CartContext";
import {
  formatMoney,
  withFinalPrice,
  findById,
} from "../utils/productTransforms";

export function CartPage({ products, status, error }) {
  const { items, totalItems, add, removeOne, remove, clear } = useCart();

  const enriched = useMemo(() => withFinalPrice(products), [products]);

  const lines = useMemo(() => {
    return Object.entries(items).map(([id, qty]) => {
      const p = findById(enriched, id);
      return { id, qty, product: p };
    });
  }, [items, enriched]);

  const totalPrice = useMemo(() => {
    return lines.reduce((acc, line) => {
      if (!line.product) return acc;
      return acc + line.qty * line.product.finalPrice;
    }, 0);
  }, [lines]);

  if (status === "loading") return <p>Cargando productos…</p>;
  if (status === "error")
    return <p className="text-red-400">Error: {error?.message}</p>;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-2xl font-bold">Carrito</h2>
        <Link className="underline" to="/">
          ← Volver al catálogo
        </Link>
      </div>

      <div className="mt-3 p-3 border border-gray-700 rounded-lg">
        <p>
          <strong>Items totales:</strong> {totalItems}
        </p>
        <p>
          <strong>Total:</strong> {formatMoney(totalPrice)}
        </p>

        <button
          onClick={clear}
          className="mt-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors text-sm font-medium"
          disabled={totalItems === 0}
        >
          Vaciar carrito
        </button>
      </div>

      <ul className="mt-3">
        {lines.length === 0 ? (
          <p>Tu carrito está más vacío que un `div` sin CSS 😄</p>
        ) : (
          lines.map((line) => {
            const p = line.product;

            if (!p) {
              return (
                <li
                  key={line.id}
                  className="mb-2 p-2 border border-gray-700 rounded"
                >
                  Producto con id <code>{line.id}</code> ya no existe.
                  <button
                    onClick={() => remove(line.id)}
                    className="ml-3 underline text-sm"
                  >
                    Quitar
                  </button>
                </li>
              );
            }

            return (
              <li
                key={line.id}
                className="mb-2 p-2 border border-gray-700 rounded flex items-center justify-between gap-3 flex-wrap"
              >
                <div>
                  <strong>{p.name}</strong>{" "}
                  <span className="text-gray-400">
                    ({formatMoney(p.finalPrice)} c/u)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeOne(p.id)}
                    className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded"
                  >
                    −
                  </button>

                  <span className="min-w-[2ch] text-center">{line.qty}</span>

                  <button
                    onClick={() => add(p.id)}
                    className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded"
                    disabled={p.stock === 0}
                    title={p.stock === 0 ? "Sin stock" : "Añadir"}
                  >
                    +
                  </button>

                  <button
                    onClick={() => remove(p.id)}
                    className="ml-2 underline text-sm"
                  >
                    Quitar
                  </button>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
