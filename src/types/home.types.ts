export interface HomeUserIdentity {
  name: string;
  businessName: string;
  initials: string;
}

export interface DailySale {
  day: string;
  value: number;
  isCurrent?: boolean;
}

export type HomeActivityType = "inventory" | "finance";

export interface HomeActivityItem {
  id: string;
  type: HomeActivityType;
  title: string;
  detail: string;
  date: string;
}

export interface HomeProductAttention {
  id: string;
  name: string;
  stockLabel: string;
  status: "low_stock" | "out_of_stock";
}

export interface HomeInventoryStatus {
  total: number;
  available: number;
  lowStock: number;
  outOfStock: number;
}

export interface HomeDashboardData {
  user: HomeUserIdentity;
  periodLabel: string;
  summary: {
    sales: number;
    salesChange: number;
    customers: number;
    activeCustomers: number;
    lowStockProducts: number;
    receivableAmount: number;
    overdueInvoices: number;
  };
  weeklySales: DailySale[];
  productsAttention: HomeProductAttention[];
  inventoryStatus: HomeInventoryStatus;
  recentActivity: HomeActivityItem[];
}
