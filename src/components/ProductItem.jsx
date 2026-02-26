import { Link } from "react-router-dom";
import { formatMoney } from "../utils/productTransforms";
import { useCart } from "../context/CartContext";

export function ProductItem({ product }) {
  const p = product;
  const { add } = useCart();

  return (
    <li className="mb-2 p-2 rounded hover:bg-gray-800 transition-colors flex items-center justify-between gap-3 flex-wrap">
      <div>
        <strong>
          <Link
            className="underline hover:no-underline"
            to={`/product/${p.id}`}
          >
            {p.name}
          </Link>
        </strong>{" "}
        — base: {formatMoney(p.price)} | desc: {(p.discount * 100).toFixed(0)}%
        | final: <strong>{formatMoney(p.finalPrice)}</strong>{" "}
        <span
          className={p.stock === 0 ? "text-red-400 font-bold" : "text-gray-400"}
        >
          ({p.stock > 0 ? `stock: ${p.stock}` : "SIN STOCK"})
        </span>
      </div>

      <button
        onClick={() => add(p.id)}
        disabled={p.stock === 0}
        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors text-sm font-medium disabled:opacity-50"
        title={p.stock === 0 ? "No hay stock" : "Añadir al carrito"}
      >
        Añadir
      </button>
    </li>
  );
}
