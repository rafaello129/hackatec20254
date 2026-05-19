import { useMemo, useState } from "react";
import {
  getAccountingEntries,
  getCashflowPoints,
  getCooperativeFinancialRecords,
  getFinanceAlerts,
  getFinanceKpis,
  getFinanceSummary,
  getInvoices,
} from "@/services/finance.service";
import type { AccountingEntryType, AccountingStatus, InvoiceStatus } from "@/types/finance.types";

type AccountingTypeFilter = AccountingEntryType | "all";
type AccountingStatusFilter = AccountingStatus | "all";
type InvoiceStatusFilter = InvoiceStatus | "all";

export function useFinance() {
  const summary = useMemo(() => getFinanceSummary(), []);
  const kpis = useMemo(() => getFinanceKpis(), []);
  const cashflowPoints = useMemo(() => getCashflowPoints(), []);
  const accountingEntries = useMemo(() => getAccountingEntries(), []);
  const invoices = useMemo(() => getInvoices(), []);
  const alerts = useMemo(() => getFinanceAlerts(), []);
  const cooperativeRecords = useMemo(() => getCooperativeFinancialRecords(), []);

  const [accountingSearchText, setAccountingSearchText] = useState("");
  const [accountingTypeFilter, setAccountingTypeFilter] = useState<AccountingTypeFilter>("all");
  const [accountingStatusFilter, setAccountingStatusFilter] = useState<AccountingStatusFilter>("all");
  const [invoiceSearchText, setInvoiceSearchText] = useState("");
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState<InvoiceStatusFilter>("all");
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(invoices[0]?.id ?? "");

  const filteredAccountingEntries = useMemo(() => {
    const query = accountingSearchText.trim().toLowerCase();

    return accountingEntries.filter((entry) => {
      const matchesText =
        !query ||
        [entry.concept, entry.category, entry.relatedEntity, entry.sourceModule, entry.notes].some((value) =>
          value.toLowerCase().includes(query),
        );
      const matchesType = accountingTypeFilter === "all" || entry.type === accountingTypeFilter;
      const matchesStatus = accountingStatusFilter === "all" || entry.status === accountingStatusFilter;

      return matchesText && matchesType && matchesStatus;
    });
  }, [accountingEntries, accountingSearchText, accountingStatusFilter, accountingTypeFilter]);

  const filteredInvoices = useMemo(() => {
    const query = invoiceSearchText.trim().toLowerCase();

    return invoices.filter((invoice) => {
      const matchesText =
        !query ||
        [invoice.folio, invoice.customerName, invoice.notes, invoice.relatedOpportunityId ?? ""].some((value) =>
          value.toLowerCase().includes(query),
        );
      const matchesStatus = invoiceStatusFilter === "all" || invoice.status === invoiceStatusFilter;

      return matchesText && matchesStatus;
    });
  }, [invoiceSearchText, invoiceStatusFilter, invoices]);

  const selectedInvoice = useMemo(
    () => invoices.find((invoice) => invoice.id === selectedInvoiceId) ?? filteredInvoices[0] ?? invoices[0],
    [filteredInvoices, invoices, selectedInvoiceId],
  );

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
  };
}
