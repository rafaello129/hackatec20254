import type { CustomerSummary } from "@/types/customer.types";

interface CustomerSummaryCardsProps {
  summary: CustomerSummary;
  onFilter: (filter: "all" | "new" | "frequent" | "inactive") => void;
}

export default function CustomerSummaryCards({
  summary,
  onFilter,
}: CustomerSummaryCardsProps) {
  const cards = [
    {
      key: "all" as const,
      label: "Clientes",
      value: summary.total,
      hint: "Personas que han comprado",
      featured: true,
    },
    {
      key: "new" as const,
      label: "Nuevos este mes",
      value: summary.newThisMonth,
      hint: "Primera compra este mes",
    },
    {
      key: "frequent" as const,
      label: "Clientes frecuentes",
      value: summary.frequent,
      hint: "Han comprado varias veces",
    },
    {
      key: "inactive" as const,
      label: "Hace tiempo que no compran",
      value: summary.inactive,
      hint: "Podrías volver a contactarlos",
    },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <button
          key={card.key}
          type="button"
          onClick={() => onFilter(card.key)}
          className={
            card.featured
              ? "min-h-[112px] rounded-[18px] bg-[#135C2F] px-5 py-4 text-left text-white transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9AC84B]"
              : "min-h-[112px] rounded-[18px] border border-[#E3E7DF] bg-white px-5 py-4 text-left transition hover:-translate-y-0.5 hover:border-[#CFD8CC] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9AC84B]/50"
          }
        >
          <p
            className={
              card.featured
                ? "text-[12px] font-medium text-[#EAF4E9]"
                : "text-[12px] font-medium text-[#35423A]"
            }
          >
            {card.label}
          </p>
          <p
            className={
              card.featured
                ? "mt-1 font-['Hanken_Grotesk'] text-[30px] font-bold leading-none text-white"
                : "mt-1 font-['Hanken_Grotesk'] text-[30px] font-bold leading-none text-[#172019]"
            }
          >
            {card.value}
          </p>
          <p
            className={
              card.featured
                ? "mt-2 text-[11px] text-[#C7F16A]"
                : "mt-2 text-[11px] text-[#657068]"
            }
          >
            {card.hint}
          </p>
        </button>
      ))}
    </section>
  );
}
