import { dashboardIdentityMock, weeklySalesChangeMock, weeklySalesMock } from "@/data/mocks/home.mock";
import { getCustomers } from "@/services/customers.service";
import { getAccountingEntries, getFinanceSummary } from "@/services/finance.service";
import { getInventoryItems, getStockMovements } from "@/services/inventory.service";
import type { HomeActivityItem, HomeDashboardData } from "@/types/home.types";

const getMovementTitle = (type: "entrada" | "salida" | "ajuste" | "reserva") => {
  if (type === "entrada") return "Entrada de inventario";
  if (type === "salida") return "Salida de inventario";
  if (type === "reserva") return "Producto reservado";
  return "Ajuste de inventario";
};

export async function getHomeDashboard(): Promise<HomeDashboardData> {
  const [customers, inventoryItems, stockMovements] = await Promise.all([
    getCustomers(),
    getInventoryItems(),
    getStockMovements(),
  ]);

  const financeSummary = getFinanceSummary();
  const accountingEntries = getAccountingEntries();

  const activeInventoryItems = inventoryItems.filter((item) => item.status !== "discontinued");

  const productsAttention = activeInventoryItems
    .filter((item) => item.status === "low_stock" || item.status === "out_of_stock")
    .sort((a, b) => {
      if (a.status === b.status) return a.quantity - b.quantity;
      return a.status === "out_of_stock" ? -1 : 1;
    })
    .slice(0, 5)
    .map((item) => ({
      id: item.id,
      name: item.name,
      stockLabel: `${item.quantity} ${item.unit}`,
      status: item.status as "low_stock" | "out_of_stock",
    }));

  const itemById = new Map(inventoryItems.map((item) => [item.id, item]));

  const inventoryActivity: HomeActivityItem[] = stockMovements.slice(0, 4).map((movement) => {
    const item = itemById.get(movement.itemId);

    return {
      id: `inventory-${movement.id}`,
      type: "inventory",
      title: getMovementTitle(movement.type),
      detail: `${item?.name ?? "Producto"} · ${Math.abs(movement.quantity)} ${item?.unit ?? "unidades"}`,
      date: movement.date,
    };
  });

  const financeActivity: HomeActivityItem[] = accountingEntries.slice(0, 4).map((entry) => ({
    id: `finance-${entry.id}`,
    type: "finance",
    title: entry.concept,
    detail: entry.relatedEntity,
    date: entry.date,
  }));

  const recentActivity = [...inventoryActivity, ...financeActivity]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  const weeklySales = weeklySalesMock.map((item) => ({ ...item }));
  const sales = weeklySales.reduce((total, item) => total + item.value, 0);

  return {
    user: dashboardIdentityMock,
    periodLabel: "Esta semana",
    summary: {
      sales,
      salesChange: weeklySalesChangeMock,
      customers: customers.filter((customer) => customer.status !== "churned").length,
      activeCustomers: customers.filter((customer) => customer.status === "active").length,
      lowStockProducts: productsAttention.length,
      receivableAmount: financeSummary.accountsReceivable,
      overdueInvoices: financeSummary.overdueInvoices,
    },
    weeklySales,
    productsAttention,
    inventoryStatus: {
      total: activeInventoryItems.length,
      available: activeInventoryItems.filter(
        (item) => item.status === "in_stock" || item.status === "reserved",
      ).length,
      lowStock: activeInventoryItems.filter((item) => item.status === "low_stock").length,
      outOfStock: activeInventoryItems.filter((item) => item.status === "out_of_stock").length,
    },
    recentActivity,
  };
}
