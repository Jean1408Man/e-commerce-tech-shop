import { Link } from "react-router-dom";
import { formatMoney } from "../utils/productTransforms";

export function ProductItem({ product }) {
  const p = product;

  return (
    <li className="mb-2 p-2 rounded hover:bg-gray-800 transition-colors">
      <strong>
        <Link className="underline hover:no-underline" to={`/product/${p.id}`}>
          {p.name}
        </Link>
      </strong>{" "}
      — base: {formatMoney(p.price)} | desc: {(p.discount * 100).toFixed(0)}% |
      final: <strong>{formatMoney(p.finalPrice)}</strong>{" "}
      <span
        className={p.stock === 0 ? "text-red-400 font-bold" : "text-gray-400"}
      >
        ({p.stock > 0 ? `stock: ${p.stock}` : "SIN STOCK"})
      </span>
    </li>
  );
}
