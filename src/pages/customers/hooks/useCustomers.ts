import { useEffect, useMemo, useState } from "react";
import {
  getCustomerInsights,
  getCustomerInteractions,
  getCustomerKpis,
  getCustomers,
} from "@/services/customers.service";
import type {
  Customer,
  CustomerInsight,
  CustomerInteraction,
  CustomerKpi,
  CustomerSegment,
  CustomerStatus,
} from "@/types/customer.types";

export type CustomerStatusFilter = CustomerStatus | "all";
export type CustomerSegmentFilter = CustomerSegment | "all";

const STATUS_OPTIONS: Array<{ value: CustomerStatusFilter; label: string }> = [
  { value: "all", label: "Todos los estados" },
  { value: "active", label: "Activo" },
  { value: "prospect", label: "Prospecto" },
  { value: "at_risk", label: "En riesgo" },
  { value: "churned", label: "Perdido" },
  { value: "inactive", label: "Inactivo" },
];

const SEGMENT_OPTIONS: Array<{ value: CustomerSegmentFilter; label: string }> = [
  { value: "all", label: "Todos los segmentos" },
  { value: "enterprise", label: "Cuenta clave" },
  { value: "pyme", label: "PyME" },
  { value: "microbusiness", label: "Microtienda" },
  { value: "distributor", label: "Distribuidor" },
  { value: "supplier", label: "Proveedor" },
  { value: "strategic_partner", label: "Socio estratégico" },
];

export function useCustomers() {
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [interactions, setInteractions] = useState<CustomerInteraction[]>([]);
  const [kpis, setKpis] = useState<CustomerKpi[]>([]);
  const [insights, setInsights] = useState<CustomerInsight[]>([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<CustomerStatusFilter>("all");
  const [segmentFilter, setSegmentFilter] = useState<CustomerSegmentFilter>("all");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      setIsLoading(true);
      const [customersData, interactionsData] = await Promise.all([
        getCustomers(),
        getCustomerInteractions(),
      ]);
      const [kpiData, insightData] = await Promise.all([
        getCustomerKpis(customersData),
        getCustomerInsights(customersData),
      ]);

      if (!mounted) {
        return;
      }

      setCustomers(customersData);
      setInteractions(interactionsData);
      setKpis(kpiData);
      setInsights(insightData);
      setSelectedCustomerId((prev) => prev ?? customersData[0]?.id ?? null);
      setIsLoading(false);
    };

    void loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredCustomers = useMemo(() => {
    const term = searchText.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesText =
        term.length === 0 ||
        customer.name.toLowerCase().includes(term) ||
        customer.companyName.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term) ||
        customer.accountManager.toLowerCase().includes(term);

      const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
      const matchesSegment = segmentFilter === "all" || customer.segment === segmentFilter;

      return matchesText && matchesStatus && matchesSegment;
    });
  }, [customers, searchText, statusFilter, segmentFilter]);

  useEffect(() => {
    if (filteredCustomers.length === 0) {
      setSelectedCustomerId(null);
      return;
    }

    const selectedStillVisible = filteredCustomers.some((customer) => customer.id === selectedCustomerId);
    if (!selectedStillVisible) {
      setSelectedCustomerId(filteredCustomers[0].id);
    }
  }, [filteredCustomers, selectedCustomerId]);

  const selectedCustomer = useMemo(
    () => filteredCustomers.find((customer) => customer.id === selectedCustomerId) ?? null,
    [filteredCustomers, selectedCustomerId],
  );

  const selectedCustomerInteractions = useMemo(() => {
    if (!selectedCustomer) {
      return [];
    }

    return interactions
      .filter((interaction) => interaction.customerId === selectedCustomer.id)
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 4);
  }, [interactions, selectedCustomer]);

  const visibleInsights = useMemo(() => insights.slice(0, 4), [insights]);

  const clearFilters = () => {
    setSearchText("");
    setStatusFilter("all");
    setSegmentFilter("all");
  };

  return {
    isLoading,
    customers,
    filteredCustomers,
    kpis,
    insights: visibleInsights,
    interactions,
    searchText,
    setSearchText,
    statusFilter,
    setStatusFilter,
    segmentFilter,
    setSegmentFilter,
    clearFilters,
    selectedCustomer,
    selectedCustomerInteractions,
    selectedCustomerId,
    setSelectedCustomerId,
    statusOptions: STATUS_OPTIONS,
    segmentOptions: SEGMENT_OPTIONS,
  };
}
