import {
  accountingEntriesMock,
  cashflowPointsMock,
  cooperativeFinancialRecordsMock,
  financeAlertsMock,
  financeKpisMock,
  financeSummaryMock,
  invoicesMock,
  moneyMovementsMock,
  receivablesMock,
  expenseBreakdownMock,
  salesExpenseSeriesMock,
} from "@/data/mocks/finance.mock";

export function getFinanceSummary() {
  return financeSummaryMock;
}

export function getFinanceKpis() {
  return financeKpisMock;
}

export function getCashflowPoints() {
  return cashflowPointsMock;
}

export function getAccountingEntries() {
  return accountingEntriesMock;
}

export function getInvoices() {
  return invoicesMock;
}

export function getFinanceAlerts() {
  return financeAlertsMock;
}

export function getCooperativeFinancialRecords() {
  return cooperativeFinancialRecordsMock;
}

export function getInvoiceById(id: string) {
  return invoicesMock.find((invoice) => invoice.id === id);
}

export function getAccountingEntryById(id: string) {
  return accountingEntriesMock.find((entry) => entry.id === id);
}


export function getMoneyMovements() {
  return moneyMovementsMock;
}

export function getReceivables() {
  return receivablesMock;
}

export function getExpenseBreakdown() {
  return expenseBreakdownMock;
}

export function getSalesExpenseSeries() {
  return salesExpenseSeriesMock;
}
