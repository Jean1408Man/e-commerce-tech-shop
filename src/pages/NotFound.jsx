import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="mt-4">
      <h2>404 — Te fuiste por una ruta que no existe 🧭</h2>
      <Link className="underline" to="/">
        ← Volver al catálogo
      </Link>
    </div>
  );
}
