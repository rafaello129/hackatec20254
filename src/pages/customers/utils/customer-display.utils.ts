import type {
  Customer,
  CustomerBehavior,
  CustomerDisplayData,
  CustomerPurchase,
  CustomerSummary,
  ReturningCustomersMetric,
} from "@/types/customer.types";

const MS_IN_DAY = 1000 * 60 * 60 * 24;

const toDate = (dateISO: string) => new Date(`${dateISO}T00:00:00`);

const getReferenceDate = (purchases: CustomerPurchase[]) => {
  if (purchases.length === 0) {
    return new Date();
  }

  return purchases.reduce((latest, purchase) => {
    const purchaseDate = toDate(purchase.date);
    return purchaseDate > latest ? purchaseDate : latest;
  }, toDate(purchases[0].date));
};

const sameMonth = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export const formatRelativePurchase = (
  dateISO: string | null,
  referenceDate: Date,
) => {
  if (!dateISO) {
    return "Sin compras";
  }

  const date = toDate(dateISO);
  const days = Math.max(
    0,
    Math.floor((referenceDate.getTime() - date.getTime()) / MS_IN_DAY),
  );

  if (days === 0) return "Hoy";
  if (days === 1) return "Ayer";
  if (days < 7) return `Hace ${days} días`;
  if (days < 30) {
    const weeks = Math.max(1, Math.round(days / 7));
    return weeks === 1 ? "Hace 1 semana" : `Hace ${weeks} semanas`;
  }

  const months = Math.max(1, Math.round(days / 30));
  return months === 1 ? "Hace 1 mes" : `Hace ${months} meses`;
};

export function buildCustomerDisplayData(
  customers: Customer[],
  purchases: CustomerPurchase[],
): CustomerDisplayData[] {
  const referenceDate = getReferenceDate(purchases);

  return customers.map((customer) => {
    const customerPurchases = purchases
      .filter((purchase) => purchase.customerId === customer.id)
      .sort((a, b) => a.date.localeCompare(b.date));

    const firstPurchase = customerPurchases[0] ?? null;
    const lastPurchase = customerPurchases.at(-1) ?? null;
    const totalSpent = customerPurchases.reduce(
      (sum, purchase) => sum + purchase.total,
      0,
    );
    const totalPurchases = customerPurchases.length;
    const averageTicket =
      totalPurchases > 0 ? Math.round(totalSpent / totalPurchases) : 0;

    const daysSinceLastPurchase = lastPurchase
      ? Math.max(
          0,
          Math.floor(
            (referenceDate.getTime() - toDate(lastPurchase.date).getTime()) /
              MS_IN_DAY,
          ),
        )
      : null;

    const isNewThisMonth =
      firstPurchase !== null &&
      sameMonth(toDate(firstPurchase.date), referenceDate);
    const isReturningThisMonth =
      firstPurchase !== null &&
      lastPurchase !== null &&
      firstPurchase.id !== lastPurchase.id &&
      !sameMonth(toDate(firstPurchase.date), referenceDate) &&
      sameMonth(toDate(lastPurchase.date), referenceDate);

    let behavior: CustomerBehavior = "regular";
    if (daysSinceLastPurchase !== null && daysSinceLastPurchase >= 45) {
      behavior = "inactive";
    } else if (isNewThisMonth) {
      behavior = "new";
    } else if (totalPurchases >= 3) {
      behavior = "frequent";
    }

    const productCounts = new Map<string, number>();
    customerPurchases.forEach((purchase) => {
      purchase.items.forEach((item) => {
        productCounts.set(
          item.name,
          (productCounts.get(item.name) ?? 0) + item.quantity,
        );
      });
    });

    const favoriteProducts = [...productCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name]) => name);

    return {
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      companyName: customer.companyName,
      notes: customer.notes,
      initials: getInitials(customer.name),
      totalPurchases,
      totalSpent,
      averageTicket,
      lastPurchaseAt: lastPurchase?.date ?? null,
      lastPurchaseLabel: formatRelativePurchase(
        lastPurchase?.date ?? null,
        referenceDate,
      ),
      daysSinceLastPurchase,
      behavior,
      isNewThisMonth,
      isReturningThisMonth,
      favoriteProducts,
    };
  });
}

export function getCustomerSummary(
  customers: CustomerDisplayData[],
): CustomerSummary {
  return {
    total: customers.length,
    newThisMonth: customers.filter((customer) => customer.behavior === "new")
      .length,
    frequent: customers.filter((customer) => customer.behavior === "frequent")
      .length,
    inactive: customers.filter((customer) => customer.behavior === "inactive")
      .length,
  };
}

export function getReturningCustomersMetric(
  customers: CustomerDisplayData[],
): ReturningCustomersMetric {
  const eligible = customers.filter(
    (customer) => customer.totalPurchases >= 2 && !customer.isNewThisMonth,
  );
  const returned = eligible.filter(
    (customer) => customer.isReturningThisMonth,
  ).length;

  return {
    returned,
    eligible: eligible.length,
    percentage:
      eligible.length > 0 ? Math.round((returned / eligible.length) * 100) : 0,
  };
}
