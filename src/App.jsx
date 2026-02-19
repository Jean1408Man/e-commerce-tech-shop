import { Route, Routes } from "react-router-dom";
import { useProducts } from "./hooks/useProducts";

import { CatalogPage } from "./pages/CatalogPage";
import { ProductDetail } from "./pages/ProductDetail";
import { NotFound } from "./pages/NotFound";

export default function App() {
  const { products, status, error } = useProducts();

  return (
    <div className="font-sans p-4 max-w-[900px] mx-auto">
      <h1>Catálogo — filtros + fetch + routing</h1>

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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
