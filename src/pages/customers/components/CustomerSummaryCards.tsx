import { Clock3, Repeat2, UserPlus, Users } from "lucide-react";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import type { CustomerSummary } from "@/types/customer.types";

type SummaryFilter = "all" | "new" | "frequent" | "inactive";

interface CustomerSummaryCardsProps {
  summary: CustomerSummary;
  activeFilter: SummaryFilter;
  onFilter: (filter: SummaryFilter) => void;
}

export default function CustomerSummaryCards({
  summary,
  activeFilter,
  onFilter,
}: CustomerSummaryCardsProps) {
  const cards = [
    {
      key: "all" as const,
      label: "Clientes",
      value: summary.total,
      hint: "Personas que han comprado",
      icon: Users,
      tone: "primary",
      spotlight: "rgba(182, 226, 81, 0.24)" as const,
    },
    {
      key: "new" as const,
      label: "Nuevos este mes",
      value: summary.newThisMonth,
      hint: "Primera compra este mes",
      icon: UserPlus,
      tone: "fresh",
      spotlight: "rgba(154, 200, 75, 0.22)" as const,
    },
    {
      key: "frequent" as const,
      label: "Clientes frecuentes",
      value: summary.frequent,
      hint: "Han comprado varias veces",
      icon: Repeat2,
      tone: "steady",
      spotlight: "rgba(19, 92, 47, 0.16)" as const,
    },
    {
      key: "inactive" as const,
      label: "Hace tiempo que no compran",
      value: summary.inactive,
      hint: "Podrías volver a contactarlos",
      icon: Clock3,
      tone: "attention",
      spotlight: "rgba(228, 172, 36, 0.18)" as const,
    },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const active = activeFilter === card.key;

        const toneClass =
          card.tone === "primary"
            ? "peek-customer-kpi--primary"
            : card.tone === "fresh"
              ? "peek-customer-kpi--fresh"
              : card.tone === "steady"
                ? "peek-customer-kpi--steady"
                : "peek-customer-kpi--attention";

        return (
          <SpotlightCard
            key={card.key}
            spotlightColor={card.spotlight}
            className={`peek-customer-kpi ${toneClass} ${active ? "is-active" : ""}`}
          >
            <button
              type="button"
              onClick={() => onFilter(card.key)}
              aria-pressed={active}
              className="peek-customer-kpi__button group relative z-[4] flex min-h-[132px] w-full flex-col justify-between overflow-hidden rounded-[20px] px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--peek-accent-lime)]"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="peek-customer-kpi__label text-[12px] font-semibold">
                    {card.label}
                  </p>
                  <p className="peek-customer-kpi__value mt-2 font-['Hanken_Grotesk'] text-[34px] font-bold leading-none tracking-[-0.04em]">
                    {card.value}
                  </p>
                </div>

                <span className="peek-customer-kpi__icon grid h-10 w-10 shrink-0 place-items-center rounded-[14px]">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="peek-customer-kpi__hint text-[11px] leading-4">
                  {card.hint}
                </p>
                <span className="peek-customer-kpi__dot h-2 w-2 shrink-0 rounded-full" />
              </div>
            </button>
          </SpotlightCard>
        );
      })}
    </section>
  );
}
