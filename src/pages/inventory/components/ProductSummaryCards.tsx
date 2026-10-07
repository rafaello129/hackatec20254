import { AlertTriangle, PackageCheck, PackageX, TrendingUp } from "lucide-react";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import type { ProductSummary } from "@/types/inventory.types";
import type { ProductAvailabilityFilter } from "../hooks/useInventory";

interface ProductSummaryCardsProps {
  summary: ProductSummary;
  activeFilter: ProductAvailabilityFilter;
  onFilter: (filter: ProductAvailabilityFilter) => void;
}

export default function ProductSummaryCards({
  summary,
  activeFilter,
  onFilter,
}: ProductSummaryCardsProps) {
  const cards = [
    {
      key: "all" as const,
      label: "Productos",
      value: String(summary.total),
      hint: "Productos registrados",
      icon: PackageCheck,
      tone: "primary",
      spotlight: "rgba(182, 226, 81, 0.24)" as const,
    },
    {
      key: "low_stock" as const,
      label: "Por agotarse",
      value: String(summary.lowStock),
      hint: "Conviene reponerlos pronto",
      icon: AlertTriangle,
      tone: "warning",
      spotlight: "rgba(228, 172, 36, 0.20)" as const,
    },
    {
      key: "out_of_stock" as const,
      label: "Agotados",
      value: String(summary.outOfStock),
      hint: "No se pueden vender ahora",
      icon: PackageX,
      tone: "danger",
      spotlight: "rgba(217, 86, 77, 0.17)" as const,
    },
    {
      key: "top" as const,
      label: "Más vendido",
      value: summary.topSellingProduct?.name ?? "Sin datos",
      hint: summary.topSellingProduct
        ? `${summary.topSellingProduct.unitsSold} ventas este mes`
        : "Aún no hay ventas",
      icon: TrendingUp,
      tone: "lime",
      spotlight: "rgba(154, 200, 75, 0.20)" as const,
    },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const filterable = card.key !== "top";
        const active = filterable && activeFilter === card.key;
        const toneClass =
          card.tone === "primary"
            ? "peek-product-kpi--primary"
            : card.tone === "warning"
              ? "peek-product-kpi--warning"
              : card.tone === "danger"
                ? "peek-product-kpi--danger"
                : "peek-product-kpi--lime";

        return (
          <SpotlightCard
            key={card.key}
            spotlightColor={card.spotlight}
            className={`peek-product-kpi ${toneClass} ${active ? "is-active" : ""}`}
          >
            <button
              type="button"
              disabled={!filterable}
              onClick={() => filterable && onFilter(card.key)}
              aria-pressed={filterable ? active : undefined}
              className="peek-product-kpi__button group relative z-[4] flex min-h-[132px] w-full flex-col justify-between overflow-hidden rounded-[20px] px-5 py-4 text-left disabled:cursor-default"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="peek-product-kpi__label text-[12px] font-semibold">
                    {card.label}
                  </p>
                  <p
                    className={
                      card.key === "top"
                        ? "peek-product-kpi__value mt-2 line-clamp-2 font-['Hanken_Grotesk'] text-[18px] font-bold leading-[1.05]"
                        : "peek-product-kpi__value mt-2 font-['Hanken_Grotesk'] text-[34px] font-bold leading-none tracking-[-0.04em]"
                    }
                  >
                    {card.value}
                  </p>
                </div>
                <span className="peek-product-kpi__icon grid h-10 w-10 shrink-0 place-items-center rounded-[14px]">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
                </span>
              </div>

              <p className="peek-product-kpi__hint mt-4 text-[11px] leading-4">
                {card.hint}
              </p>
            </button>
          </SpotlightCard>
        );
      })}
    </section>
  );
}
