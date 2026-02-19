import { useEffect, useState } from "react";

export function useLocalStorageState(key, initialValue) {
  // Guardamos el valor inicial "congelado" una sola vez (se queda fijo toda la vida del componente)
  const [initial] = useState(() =>
    typeof initialValue === "function" ? initialValue() : initialValue,
  );

  // Estado real (reactivo) que usará la UI
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") return initial;

    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return initial;
      return JSON.parse(raw);
    } catch {
      // Si el JSON está corrupto o hay basura, volvemos al valor inicial
      return initial;
    }
  });

  // Persistimos cada vez que state cambie
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stateStr = JSON.stringify(state);
      const initialStr = JSON.stringify(initial);

      // Si vuelve al valor "de fábrica", borramos la key del storage
      if (stateStr === initialStr) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, stateStr);
      }
    } catch {
      // Si storage falla (modo privado raro, cuota, etc), no rompemos la app
    }
  }, [key, state, initial]);

  return [state, setState];
}
