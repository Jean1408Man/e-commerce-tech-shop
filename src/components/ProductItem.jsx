import { Link } from "react-router-dom";
import { formatMoney } from "../utils/productTransforms";
import { useCart } from "../context/CartContext";

export function ProductItem({ product }) {
  const p = product;
  const { add } = useCart();

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={`https://images.unsplash.com/photo-1526733158272-6df9f0f9b37a?auto=format&fit=crop&q=80&w=600&h=400&q=80&sig=${p.id}`}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {p.discount > 0 && (
          <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
            -{Math.round(p.discount * 100)}%
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col grow">
        <div className="mb-4">
          <Link
            className="text-lg font-bold text-gray-100 hover:text-blue-400 transition-colors"
            to={`/product/${p.id}`}
          >
            {p.name}
          </Link>
          <p className="text-gray-400 text-sm mt-1 uppercase tracking-wider">
            {p.category}
          </p>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-white">
              {formatMoney(p.finalPrice)}
            </span>
            {p.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {formatMoney(p.price)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <span
              className={`text-xs font-medium ${p.stock === 0 ? "text-red-500" : "text-gray-400"}`}
            >
              {p.stock > 0
                ? `${p.stock} unidades disponibles`
                : "Temporalmente agotado"}
            </span>

            <button
              onClick={() => add(p.id)}
              disabled={p.stock === 0}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm font-semibold disabled:opacity-50 disabled:bg-gray-800"
            >
              {p.stock === 0 ? "Agotado" : "Añadir"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
