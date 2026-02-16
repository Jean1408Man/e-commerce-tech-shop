export const formatMoney = (value) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);

export const withFinalPrice = (products) =>
  products.map((p) => {
    const finalPrice = +(p.price * (1 - p.discount)).toFixed(2);
    return { ...p, finalPrice };
  });

export const onlyInStock = (products) =>
  products.filter((p) => p.stock > 0);

export const byCategory = (products, category) =>
  products.filter((p) => p.category === category);

export const findById = (products, id) =>
  products.find((p) => p.id === id);

// Extra (opcional): resumen con reduce
export const stockValueSummary = (products) =>
  products.reduce(
    (acc, p) => {
      acc.totalItems += p.stock;
      acc.totalValue += p.stock * p.price;
      return acc;
    },
    { totalItems: 0, totalValue: 0 }
  );
