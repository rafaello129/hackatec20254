import { useMemo, useState } from "react";
import {
  getAccountingEntries,
  getCashflowPoints,
  getCooperativeFinancialRecords,
  getFinanceAlerts,
  getFinanceKpis,
  getFinanceSummary,
  getInvoices,
  getMoneyMovements,
  getReceivables,
  getSalesExpenseSeries,
} from "@/services/finance.service";
import type {
  AccountingEntryType,
  AccountingStatus,
  ExpenseBreakdownItem,
  ExpenseCategory,
  InvoiceStatus,
  MoneyMovement,
  MoneyMovementFilter,
  MoneyPeriod,
} from "@/types/finance.types";

type AccountingTypeFilter = AccountingEntryType | "all";
type AccountingStatusFilter = AccountingStatus | "all";
type InvoiceStatusFilter = InvoiceStatus | "all";

export interface NewExpenseInput {
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: string;
}

const expenseLabels: Record<ExpenseCategory, string> = {
  products: "Productos o mercancía",
  materials: "Materiales",
  transport: "Transporte",
  services: "Servicios",
  rent: "Renta y local",
  marketing: "Publicidad",
  other: "Otros",
};

export function useFinance() {
  const summary = useMemo(() => getFinanceSummary(), []);
  const kpis = useMemo(() => getFinanceKpis(), []);
  const cashflowPoints = useMemo(() => getCashflowPoints(), []);
  const accountingEntries = useMemo(() => getAccountingEntries(), []);
  const invoices = useMemo(() => getInvoices(), []);
  const alerts = useMemo(() => getFinanceAlerts(), []);
  const cooperativeRecords = useMemo(() => getCooperativeFinancialRecords(), []);

  const initialMoneyMovements = useMemo(() => getMoneyMovements(), []);
  const receivables = useMemo(() => getReceivables(), []);
  const salesExpenseSeries = useMemo(() => getSalesExpenseSeries(), []);

  const [moneyMovements, setMoneyMovements] =
    useState<MoneyMovement[]>(initialMoneyMovements);
  const [period, setPeriod] = useState<MoneyPeriod>("month");
  const [movementFilter, setMovementFilter] =
    useState<MoneyMovementFilter>("all");

  const [accountingSearchText, setAccountingSearchText] = useState("");
  const [accountingTypeFilter, setAccountingTypeFilter] =
    useState<AccountingTypeFilter>("all");
  const [accountingStatusFilter, setAccountingStatusFilter] =
    useState<AccountingStatusFilter>("all");
  const [invoiceSearchText, setInvoiceSearchText] = useState("");
  const [invoiceStatusFilter, setInvoiceStatusFilter] =
    useState<InvoiceStatusFilter>("all");
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(
    invoices[0]?.id ?? "",
  );

  const moneySummary = useMemo(() => {
    const sales = moneyMovements
      .filter((movement) => movement.type === "income")
      .reduce((sum, movement) => sum + movement.amount, 0);

    const expenses = moneyMovements
      .filter((movement) => movement.type === "expense")
      .reduce((sum, movement) => sum + movement.amount, 0);

    const receivable = receivables.reduce(
      (sum, item) => sum + item.amount,
      0,
    );

    return {
      sales,
      expenses,
      approximateProfit: Math.max(0, sales - expenses),
      receivable,
      pendingPayments: receivables.length,
    };
  }, [moneyMovements, receivables]);

  const filteredMoneyMovements = useMemo(
    () =>
      moneyMovements.filter(
        (movement) =>
          movementFilter === "all" || movement.type === movementFilter,
      ),
    [moneyMovements, movementFilter],
  );

  const expenseBreakdown = useMemo<ExpenseBreakdownItem[]>(() => {
    const grouped = new Map<ExpenseCategory, number>();

    moneyMovements
      .filter((movement) => movement.type === "expense")
      .forEach((movement) => {
        const category =
          movement.category === "sale"
            ? "other"
            : (movement.category as ExpenseCategory);
        grouped.set(category, (grouped.get(category) ?? 0) + movement.amount);
      });

    return [...grouped.entries()]
      .map(([category, amount]) => ({
        category,
        label: expenseLabels[category],
        amount,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [moneyMovements]);

  const baseExpenses = useMemo(
    () =>
      initialMoneyMovements
        .filter((movement) => movement.type === "expense")
        .reduce((sum, movement) => sum + movement.amount, 0),
    [initialMoneyMovements],
  );

  const additionalExpenses = Math.max(
    0,
    moneySummary.expenses - baseExpenses,
  );

  const chartData = useMemo(() => {
    const points = salesExpenseSeries[period].map((point) => ({ ...point }));

    if (additionalExpenses > 0 && points.length > 0) {
      points[points.length - 1] = {
        ...points[points.length - 1],
        expenses: points[points.length - 1].expenses + additionalExpenses,
      };
    }

    return points;
  }, [additionalExpenses, period, salesExpenseSeries]);

  const summaryVisuals = useMemo(() => {
    const quarter = salesExpenseSeries.quarter;
    const previous = quarter.at(-2) ?? { sales: 0, expenses: 0 };
    const currentProfit = moneySummary.approximateProfit;
    const previousProfit = Math.max(0, previous.sales - previous.expenses);

    const salesChangePct =
      previous.sales > 0
        ? ((moneySummary.sales - previous.sales) / previous.sales) * 100
        : 0;

    const weekly = salesExpenseSeries.week;
    const salesTrend = weekly.map((point) => point.sales);
    const expenseTrend = weekly.map((point, index) =>
      index === weekly.length - 1
        ? point.expenses + additionalExpenses
        : point.expenses,
    );

    return {
      salesTrend,
      expenseTrend,
      salesChangePct,
      expensesChange: moneySummary.expenses - previous.expenses,
      profitChange: currentProfit - previousProfit,
    };
  }, [
    additionalExpenses,
    moneySummary.approximateProfit,
    moneySummary.expenses,
    moneySummary.sales,
    salesExpenseSeries,
  ]);

  const filteredAccountingEntries = useMemo(() => {
    const query = accountingSearchText.trim().toLowerCase();

    return accountingEntries.filter((entry) => {
      const matchesText =
        !query ||
        [
          entry.concept,
          entry.category,
          entry.relatedEntity,
          entry.sourceModule,
          entry.notes,
        ].some((value) => value.toLowerCase().includes(query));
      const matchesType =
        accountingTypeFilter === "all" ||
        entry.type === accountingTypeFilter;
      const matchesStatus =
        accountingStatusFilter === "all" ||
        entry.status === accountingStatusFilter;

      return matchesText && matchesType && matchesStatus;
    });
  }, [
    accountingEntries,
    accountingSearchText,
    accountingStatusFilter,
    accountingTypeFilter,
  ]);

  const filteredInvoices = useMemo(() => {
    const query = invoiceSearchText.trim().toLowerCase();

    return invoices.filter((invoice) => {
      const matchesText =
        !query ||
        [
          invoice.folio,
          invoice.customerName,
          invoice.notes,
          invoice.relatedOpportunityId ?? "",
        ].some((value) => value.toLowerCase().includes(query));
      const matchesStatus =
        invoiceStatusFilter === "all" ||
        invoice.status === invoiceStatusFilter;

      return matchesText && matchesStatus;
    });
  }, [invoiceSearchText, invoiceStatusFilter, invoices]);

  const selectedInvoice = useMemo(
    () =>
      invoices.find((invoice) => invoice.id === selectedInvoiceId) ??
      filteredInvoices[0] ??
      invoices[0],
    [filteredInvoices, invoices, selectedInvoiceId],
  );

  function registerExpense(input: NewExpenseInput) {
    const movement: MoneyMovement = {
      id: `money-local-${Date.now()}`,
      date: input.date,
      type: "expense",
      amount: Math.max(0, input.amount),
      category: input.category,
      description: input.description.trim() || expenseLabels[input.category],
      detail: expenseLabels[input.category],
      source: "manual",
    };

    setMoneyMovements((current) => [movement, ...current]);
  }

  function clearAccountingFilters() {
    setAccountingSearchText("");
    setAccountingTypeFilter("all");
    setAccountingStatusFilter("all");
  }

  function clearInvoiceFilters() {
    setInvoiceSearchText("");
    setInvoiceStatusFilter("all");
  }

  return {
    summary,
    kpis,
    cashflowPoints,
    accountingEntries,
    filteredAccountingEntries,
    invoices,
    filteredInvoices,
    alerts,
    cooperativeRecords,
    accountingSearchText,
    setAccountingSearchText,
    accountingTypeFilter,
    setAccountingTypeFilter,
    accountingStatusFilter,
    setAccountingStatusFilter,
    invoiceSearchText,
    setInvoiceSearchText,
    invoiceStatusFilter,
    setInvoiceStatusFilter,
    selectedInvoice,
    selectedInvoiceId,
    setSelectedInvoiceId,
    clearAccountingFilters,
    clearInvoiceFilters,

    moneySummary,
    summaryVisuals,
    moneyMovements,
    filteredMoneyMovements,
    period,
    setPeriod,
    movementFilter,
    setMovementFilter,
    chartData,
    receivables,
    expenseBreakdown,
    registerExpense,
  };
}
