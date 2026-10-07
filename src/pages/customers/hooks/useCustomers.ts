import { useEffect, useMemo, useState } from "react";
import { getCustomerPurchases, getCustomers } from "@/services/customers.service";
import type {
  Customer,
  CustomerBehavior,
  CustomerDisplayData,
  CustomerPurchase,
} from "@/types/customer.types";
import {
  buildCustomerDisplayData,
  getCustomerSummary,
  getReturningCustomersMetric,
} from "../utils/customer-display.utils";

export type CustomerBehaviorFilter = "all" | CustomerBehavior;

export interface NewCustomerInput {
  name: string;
  phone: string;
  email?: string;
  companyName?: string;
  notes?: string;
}

export function useCustomers() {
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [purchases, setPurchases] = useState<CustomerPurchase[]>([]);
  const [searchText, setSearchText] = useState("");
  const [behaviorFilter, setBehaviorFilter] =
    useState<CustomerBehaviorFilter>("all");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      setIsLoading(true);
      const [customersData, purchasesData] = await Promise.all([
        getCustomers(),
        getCustomerPurchases(),
      ]);

      if (!mounted) return;

      setCustomers(customersData);
      setPurchases(purchasesData);
      setIsLoading(false);
    };

    void loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const customerViews = useMemo(
    () => buildCustomerDisplayData(customers, purchases),
    [customers, purchases],
  );

  const summary = useMemo(
    () => getCustomerSummary(customerViews),
    [customerViews],
  );

  const returningCustomers = useMemo(
    () => getReturningCustomersMetric(customerViews),
    [customerViews],
  );

  const inactiveCustomers = useMemo(
    () =>
      customerViews
        .filter((customer) => customer.behavior === "inactive")
        .sort(
          (a, b) =>
            (b.daysSinceLastPurchase ?? 0) - (a.daysSinceLastPurchase ?? 0),
        ),
    [customerViews],
  );

  const filteredCustomers = useMemo(() => {
    const term = searchText.trim().toLowerCase();

    return customerViews.filter((customer) => {
      const matchesText =
        term.length === 0 ||
        customer.name.toLowerCase().includes(term) ||
        customer.phone.toLowerCase().includes(term) ||
        customer.companyName.toLowerCase().includes(term);

      const matchesBehavior =
        behaviorFilter === "all" || customer.behavior === behaviorFilter;

      return matchesText && matchesBehavior;
    });
  }, [customerViews, searchText, behaviorFilter]);

  const selectedCustomer = useMemo(
    () =>
      customerViews.find((customer) => customer.id === selectedCustomerId) ??
      null,
    [customerViews, selectedCustomerId],
  );

  const selectedCustomerPurchases = useMemo(() => {
    if (!selectedCustomerId) return [];

    return purchases
      .filter((purchase) => purchase.customerId === selectedCustomerId)
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [purchases, selectedCustomerId]);

  const clearFilters = () => {
    setSearchText("");
    setBehaviorFilter("all");
  };

  const addCustomer = (input: NewCustomerInput) => {
    const id = `cust-local-${Date.now()}`;
    const today = new Date().toISOString().slice(0, 10);

    const customer: Customer = {
      id,
      name: input.name.trim(),
      companyName: input.companyName?.trim() || "Cliente particular",
      email: input.email?.trim() || "",
      phone: input.phone.trim(),
      website: "",
      status: "active",
      segment: "microbusiness",
      annualValue: 0,
      healthScore: 75,
      accountManager: "",
      lastInteraction: today,
      location: "",
      tags: ["nuevo"],
      notes: input.notes?.trim() || "",
      createdAt: today,
    };

    setCustomers((current) => [customer, ...current]);
    setSelectedCustomerId(id);
    setBehaviorFilter("all");
    setSearchText("");
    return id;
  };

  const openCustomer = (customer: CustomerDisplayData) => {
    setSelectedCustomerId(customer.id);
  };

  return {
    isLoading,
    customers: customerViews,
    filteredCustomers,
    summary,
    returningCustomers,
    inactiveCustomers,
    purchases,
    searchText,
    setSearchText,
    behaviorFilter,
    setBehaviorFilter,
    clearFilters,
    selectedCustomer,
    selectedCustomerPurchases,
    selectedCustomerId,
    setSelectedCustomerId,
    openCustomer,
    addCustomer,
  };
}
