import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "cart.items.v1";

function loadInitialCart() {
  if (typeof window === "undefined") return { items: {} };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: {} };

    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return { items: {} };
    if (!data.items || typeof data.items !== "object") return { items: {} };

    return data;
  } catch {
    return { items: {} };
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const id = action.id;
      const prev = state.items[id] ?? 0;

      return {
        ...state,
        items: {
          ...state.items,
          [id]: prev + 1,
        },
      };
    }

    case "removeOne": {
      const id = action.id;
      const prev = state.items[id] ?? 0;
      if (prev <= 1) {
        const { [id]: _, ...rest } = state.items; // “sacamos” la key id
        return { ...state, items: rest };
      }

      return {
        ...state,
        items: {
          ...state.items,
          [id]: prev - 1,
        },
      };
    }

    case "remove": {
      const id = action.id;
      const { [id]: _, ...rest } = state.items;
      return { ...state, items: rest };
    }

    case "clear":
      return { items: {} };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  // 3er argumento: inicialización “lazy” leyendo localStorage una sola vez
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialCart);

  // Persistencia
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // si falla el storage, no rompemos la app
    }
  }, [state]);

  const totalItems = useMemo(() => {
    return Object.values(state.items).reduce((acc, qty) => acc + qty, 0);
  }, [state.items]);

  const api = useMemo(() => {
    return {
      items: state.items,
      totalItems,
      add: (id) => dispatch({ type: "add", id }),
      removeOne: (id) => dispatch({ type: "removeOne", id }),
      remove: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state.items, totalItems]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de <CartProvider>");
  }
  return ctx;
}
