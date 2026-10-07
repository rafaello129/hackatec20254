import { ArrowDownRight, HandCoins, WalletCards, WalletMinimal } from "lucide-react";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import type { MoneySummary } from "@/types/finance.types";

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export default function MoneySummaryCards({ summary }: { summary: MoneySummary }) {
  const cards = [
    {
      key: "sales",
      label: "Ventas",
      value: money.format(summary.sales),
      hint: "Este mes",
      icon: WalletCards,
      tone: "primary",
      spotlight: "rgba(182, 226, 81, 0.24)" as const,
    },
    {
      key: "expenses",
      label: "Gastos",
      value: money.format(summary.expenses),
      hint: "Este mes",
      icon: ArrowDownRight,
      tone: "warning",
      spotlight: "rgba(228, 172, 36, 0.20)" as const,
    },
    {
      key: "profit",
      label: "Te quedó",
      value: money.format(summary.approximateProfit),
      hint: "Ventas menos gastos registrados",
      icon: WalletMinimal,
      tone: "lime",
      spotlight: "rgba(154, 200, 75, 0.20)" as const,
    },
    {
      key: "receivable",
      label: "Por cobrar",
      value: money.format(summary.receivable),
      hint: `${summary.pendingPayments} ${summary.pendingPayments === 1 ? "pago pendiente" : "pagos pendientes"}`,
      icon: HandCoins,
      tone: "soft",
      spotlight: "rgba(47, 135, 58, 0.16)" as const,
    },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const toneClass =
          card.tone === "primary"
            ? "peek-money-kpi--primary"
            : card.tone === "warning"
              ? "peek-money-kpi--warning"
              : card.tone === "lime"
                ? "peek-money-kpi--lime"
                : "peek-money-kpi--soft";

        return (
          <SpotlightCard
            key={card.key}
            spotlightColor={card.spotlight}
            className={`peek-money-kpi ${toneClass}`}
          >
            <div
              className="peek-money-kpi__content relative z-[4] flex min-h-[132px] flex-col justify-between rounded-[20px] px-5 py-4"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="peek-money-kpi__label text-[12px] font-semibold">
                    {card.label}
                  </p>
                  <p className="peek-money-kpi__value mt-2 truncate font-['Hanken_Grotesk'] text-[30px] font-bold leading-none tracking-[-0.035em]">
                    {card.value}
                  </p>
                </div>
                <span className="peek-money-kpi__icon grid h-10 w-10 shrink-0 place-items-center rounded-[14px]">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
                </span>
              </div>
              <p className="peek-money-kpi__hint mt-4 text-[11px] leading-4">
                {card.hint}
              </p>
            </div>
          </SpotlightCard>
        );
      })}
    </section>
  );
}
