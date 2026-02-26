import { Route, Routes, Link } from "react-router-dom";
import { useProducts } from "./hooks/useProducts";

import { CatalogPage } from "./pages/CatalogPage";
import { ProductDetail } from "./pages/ProductDetail";
import { CartPage } from "./pages/CartPage";
import { NotFound } from "./pages/NotFound";

import { useCart } from "./context/CartContext";

export default function App() {
  const { products, status, error } = useProducts();
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-800 pb-8 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Tech Shop
            </h1>
            <p className="text-gray-400 mt-1 font-medium">
              Componentes de hardware de alto rendimiento
            </p>
          </div>

          <nav className="flex items-center gap-6">
            <Link
              className="text-sm font-semibold text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
              to="/"
            >
              Catálogo
            </Link>
            <Link
              className="relative inline-flex items-center gap-2 px-6 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full transition-all group overflow-hidden shadow-lg shadow-black/50"
              to="/cart"
            >
              <span className="text-sm font-bold">Carrito</span>
              <span className="bg-blue-600 text-[11px] font-black px-2 py-0.5 rounded-full group-hover:scale-110 transition-transform">
                {totalItems}
              </span>
            </Link>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <CatalogPage products={products} status={status} error={error} />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetail
                products={products}
                status={status}
                error={error}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage products={products} status={status} error={error} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
