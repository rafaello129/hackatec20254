import type {
  InventoryItem,
  ProductAvailability,
  ProductDisplayData,
  ProductSummary,
  StockMovement,
} from "@/types/inventory.types";

const toDate = (dateISO: string) => new Date(`${dateISO}T00:00:00`);

const getReferenceDate = (items: InventoryItem[], movements: StockMovement[]) => {
  const dates = [
    ...items.map((item) => item.lastUpdated),
    ...items.map((item) => item.lastSaleAt).filter(Boolean),
    ...movements.map((movement) => movement.date),
  ].filter(Boolean) as string[];

  if (dates.length === 0) return new Date();

  return dates
    .map(toDate)
    .sort((a, b) => b.getTime() - a.getTime())[0];
};

export const getProductAvailability = (
  stock: number,
  lowStockAt: number,
): ProductAvailability => {
  if (stock <= 0) return "out_of_stock";
  if (stock <= lowStockAt) return "low_stock";
  return "available";
};

export const formatRelativeSale = (
  dateISO: string | null | undefined,
  referenceDate: Date,
) => {
  if (!dateISO) return "Sin ventas recientes";

  const diffDays = Math.max(
    0,
    Math.floor(
      (referenceDate.getTime() - toDate(dateISO).getTime()) /
        (1000 * 60 * 60 * 24),
    ),
  );

  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Ayer";
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) {
    const weeks = Math.max(1, Math.round(diffDays / 7));
    return weeks === 1 ? "Hace 1 semana" : `Hace ${weeks} semanas`;
  }

  const months = Math.max(1, Math.round(diffDays / 30));
  return months === 1 ? "Hace 1 mes" : `Hace ${months} meses`;
};

export const buildProductDisplayData = (
  items: InventoryItem[],
  movements: StockMovement[],
): ProductDisplayData[] => {
  const referenceDate = getReferenceDate(items, movements);

  return items
    .filter((item) => item.status !== "discontinued")
    .map((item) => {
      const price = item.price ?? 0;
      const cost = item.cost ?? Math.round(price * 0.55);
      const stock = item.quantity;
      const lowStockAt = item.minStock;
      const availability = getProductAvailability(stock, lowStockAt);

      return {
        id: item.id,
        name: item.name,
        image:
          item.image ??
          "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=480&h=480&q=82",
        category: item.displayCategory ?? "Regalos",
        description: item.description,
        price,
        cost,
        stock,
        unit: item.unit,
        lowStockAt,
        unitsSoldThisMonth: item.unitsSoldThisMonth ?? 0,
        lastSaleAt: item.lastSaleAt ?? null,
        lastSaleLabel: formatRelativeSale(item.lastSaleAt, referenceDate),
        supplier: item.supplier,
        notes: item.notes ?? "",
        availability,
        sku: item.sku,
      };
    });
};

export const getProductSummary = (
  products: ProductDisplayData[],
): ProductSummary => {
  const topSellingProduct =
    [...products].sort(
      (a, b) => b.unitsSoldThisMonth - a.unitsSoldThisMonth,
    )[0] ?? null;

  return {
    total: products.length,
    lowStock: products.filter((product) => product.availability === "low_stock")
      .length,
    outOfStock: products.filter(
      (product) => product.availability === "out_of_stock",
    ).length,
    soldThisMonth: products.reduce(
      (sum, product) => sum + product.unitsSoldThisMonth,
      0,
    ),
    topSellingProduct: topSellingProduct
      ? {
          id: topSellingProduct.id,
          name: topSellingProduct.name,
          unitsSold: topSellingProduct.unitsSoldThisMonth,
        }
      : null,
  };
};

export const getProductsNeedingAttention = (
  products: ProductDisplayData[],
) =>
  [...products]
    .filter(
      (product) =>
        product.availability !== "available" ||
        (product.stock <= product.lowStockAt * 1.6 &&
          product.unitsSoldThisMonth >= 10),
    )
    .sort((a, b) => {
      const priority = { out_of_stock: 0, low_stock: 1, available: 2 } as const;
      const statusDelta = priority[a.availability] - priority[b.availability];
      if (statusDelta !== 0) return statusDelta;
      return b.unitsSoldThisMonth - a.unitsSoldThisMonth;
    })
    .slice(0, 4);

export const getTopSellingProducts = (products: ProductDisplayData[]) =>
  [...products]
    .sort((a, b) => b.unitsSoldThisMonth - a.unitsSoldThisMonth)
    .slice(0, 5);
