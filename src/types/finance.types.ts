export interface FinancialPeriod {
  label: string;
  startDate: string;
  endDate: string;
}

export type AccountingEntryType =
  | "income"
  | "expense"
  | "adjustment"
  | "transfer"
  | "tax"
  | "cooperative_contribution";

export type AccountingStatus = "registered" | "pending" | "reconciled" | "canceled";

export type InvoiceStatus = "draft" | "issued" | "paid" | "pending" | "overdue" | "canceled";

export type PaymentMethod = "bank_transfer" | "spei" | "credit_card" | "cash" | "pending";

export interface FinanceSummary {
  period: FinancialPeriod;
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  availableCashflow: number;
  accountsReceivable: number;
  accountsPayable: number;
  cooperativeRevenue: number;
  pendingInvoices: number;
  overdueInvoices: number;
}

export interface FinanceKpi {
  id: string;
  label: string;
  value: number;
  format: "currency" | "number" | "percent";
  hint: string;
  trend: "up" | "down" | "stable";
}

export interface CashflowPoint {
  period: string;
  revenue: number;
  expenses: number;
  netFlow: number;
}

export interface AccountingEntry {
  id: string;
  date: string;
  type: AccountingEntryType;
  concept: string;
  category: string;
  amount: number;
  status: AccountingStatus;
  sourceModule: "Clientes" | "Inventario" | "Cooperativos" | "Finanzas";
  relatedEntity: string;
  notes: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  folio: string;
  customerName: string;
  relatedOpportunityId?: string;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  taxes: number;
  total: number;
  status: InvoiceStatus;
  items: InvoiceItem[];
  paymentMethod: PaymentMethod;
  notes: string;
}

export interface FinanceAlert {
  id: string;
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  recommendation: string;
  relatedEntity: string;
  impactAmount?: number;
}

export interface CooperativeFinancialRecord {
  id: string;
  opportunityTitle: string;
  agreementId: string;
  participants: string[];
  totalAgreementValue: number;
  contributionsCollected: number;
  pendingContributions: number;
  deliveryCost: number;
  distributionStatus: "pending" | "calculated" | "in_review" | "completed";
  invoiceStatus: InvoiceStatus;
}
