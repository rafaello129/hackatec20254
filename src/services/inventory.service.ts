import {
  catalogItemsMock,
  inventoryAlertsMock,
  inventoryItemsMock,
  inventoryKpisMock,
  stockMovementsMock,
} from "@/data/mocks/inventory.mock";
import type {
  CatalogItem,
  InventoryAlert,
  InventoryItem,
  InventoryKpi,
  StockMovement,
} from "@/types/inventory.types";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);

export async function getInventoryItems(): Promise<InventoryItem[]> {
  return inventoryItemsMock;
}

export async function getInventoryItemById(id: string): Promise<InventoryItem | undefined> {
  return inventoryItemsMock.find((item) => item.id === id);
}

export async function getStockMovements(): Promise<StockMovement[]> {
  return stockMovementsMock;
}

export async function getInventoryAlerts(): Promise<InventoryAlert[]> {
  return inventoryAlertsMock;
}

export async function getCatalogItems(): Promise<CatalogItem[]> {
  return catalogItemsMock;
}

export async function getInventoryKpis(itemsInput?: InventoryItem[]): Promise<InventoryKpi[]> {
  const items = itemsInput ?? (await getInventoryItems());
  if (items.length === 0) {
    return inventoryKpisMock;
  }

  const totalSku = items.length;
  const lowStockCount = items.filter((item) => item.status === "low_stock" || item.status === "out_of_stock").length;
  const estimatedValue = Math.round(items.reduce((total, item) => total + item.estimatedValue, 0));
  const recentMovements = stockMovementsMock.length;

  return [
    {
      id: "total_sku",
      label: "Total SKU",
      value: totalSku,
      formattedValue: String(totalSku),
      hint: "Productos y servicios activos",
    },
    {
      id: "low_stock",
      label: "Bajo stock",
      value: lowStockCount,
      formattedValue: String(lowStockCount),
      hint: "Items en riesgo operativo",
    },
    {
      id: "estimated_value",
      label: "Valor estimado",
      value: estimatedValue,
      formattedValue: formatCurrency(estimatedValue),
      hint: "Valorizacion de inventario",
    },
    {
      id: "recent_movements",
      label: "Movimientos recientes",
      value: recentMovements,
      formattedValue: String(recentMovements),
      hint: "Entradas, salidas y reservas",
    },
  ];
}
