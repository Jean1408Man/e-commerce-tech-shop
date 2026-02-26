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
    <div className="font-sans p-4 max-w-[900px] mx-auto">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <h1>Catálogo — filtros + fetch + routing</h1>

        <Link className="underline" to="/cart">
          Carrito ({totalItems})
        </Link>
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
            <ProductDetail products={products} status={status} error={error} />
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
  );
}
