import {
  ArrowDownRight,
  ArrowUpRight,
  Landmark,
  WalletCards,
} from "lucide-react";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import type { MoneySummary } from "@/types/finance.types";

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

interface SummaryVisuals {
  salesTrend: number[];
  expenseTrend: number[];
  salesChangePct: number;
  expensesChange: number;
  profitChange: number;
}

interface MoneySummaryCardsProps {
  summary: MoneySummary;
  visuals: SummaryVisuals;
}

function MiniBars({
  values,
  tone,
}: {
  values: number[];
  tone: "sales" | "expenses";
}) {
  const max = Math.max(...values, 1);

  return (
    <div className="flex h-8 items-end gap-1" aria-hidden="true">
      {values.map((value, index) => (
        <span
          key={`${tone}-${index}`}
          className={
            tone === "sales"
              ? "peek-money-spark-bar w-2 rounded-t-[3px] bg-[var(--oe-primary)]"
              : "peek-money-spark-bar w-2 rounded-t-[3px] bg-[var(--peek-warning)]"
          }
          style={{
            height: `${Math.max(18, (value / max) * 100)}%`,
            animationDelay: `${index * 55}ms`,
          }}
        />
      ))}
    </div>
  );
}

export default function MoneySummaryCards({
  summary,
  visuals,
}: MoneySummaryCardsProps) {
  const salesPositive = visuals.salesChangePct >= 0;
  const expenseUp = visuals.expensesChange > 0;
  const profitPositive = visuals.profitChange >= 0;

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-12">
      <SpotlightCard
        spotlightColor="rgba(154, 200, 75, 0.12)"
        className="peek-money-summary-card xl:col-span-3"
      >
        <div className="peek-money-card-enter relative z-[4] flex min-h-[144px] flex-col justify-between rounded-[20px] bg-white p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#718078]">
                Ventas
              </p>
              <p className="mt-2 font-['Hanken_Grotesk'] text-[31px] font-bold leading-none tracking-[-0.04em] text-[var(--oe-text)]">
                {money.format(summary.sales)}
              </p>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-[13px] bg-[var(--peek-success-soft)] text-[var(--oe-primary)]">
              <WalletCards className="h-[18px] w-[18px]" />
            </span>
          </div>

          <div className="mt-5 flex items-end justify-between gap-4">
            <span
              className={
                salesPositive
                  ? "inline-flex items-center gap-1 text-[10px] font-semibold text-[var(--peek-success)]"
                  : "inline-flex items-center gap-1 text-[10px] font-semibold text-[var(--peek-danger)]"
              }
            >
              {salesPositive ? (
                <ArrowUpRight className="h-3.5 w-3.5" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5" />
              )}
              {Math.abs(visuals.salesChangePct).toFixed(1)}% vs mes pasado
            </span>
            <MiniBars values={visuals.salesTrend} tone="sales" />
          </div>
        </div>
      </SpotlightCard>

      <SpotlightCard
        spotlightColor="rgba(228, 172, 36, 0.12)"
        className="peek-money-summary-card xl:col-span-3"
      >
        <div
          className="peek-money-card-enter relative z-[4] flex min-h-[144px] flex-col justify-between rounded-[20px] bg-white p-5"
          style={{ animationDelay: "90ms" }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#718078]">
                Gastos
              </p>
              <p className="mt-2 font-['Hanken_Grotesk'] text-[31px] font-bold leading-none tracking-[-0.04em] text-[var(--oe-text)]">
                {money.format(summary.expenses)}
              </p>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-[13px] bg-[var(--peek-warning-soft)] text-[#946500]">
              <ArrowDownRight className="h-[18px] w-[18px]" />
            </span>
          </div>

          <div className="mt-5 flex items-end justify-between gap-4">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#8B6205]">
              {expenseUp ? "+" : "−"}
              {money.format(Math.abs(visuals.expensesChange))} vs mes pasado
            </span>
            <MiniBars values={visuals.expenseTrend} tone="expenses" />
          </div>
        </div>
      </SpotlightCard>

      <SpotlightCard
        spotlightColor="rgba(182, 226, 81, 0.16)"
        className="peek-money-summary-card peek-dark-surface sm:col-span-2 xl:col-span-6"
      >
        <div
          className="peek-money-card-enter relative z-[4] flex min-h-[144px] flex-col justify-between rounded-[20px] bg-[var(--oe-primary)] p-5 sm:flex-row sm:items-center sm:p-6"
          style={{ animationDelay: "180ms" }}
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#DCE9DD]">
              Te quedó
            </p>
            <p className="mt-2 font-['Hanken_Grotesk'] text-[38px] font-bold leading-none tracking-[-0.045em] text-white">
              {money.format(summary.approximateProfit)}
            </p>
            <p className="mt-2 text-[10px] text-[#D9E7DB]">
              Aproximadamente · ventas menos gastos registrados
            </p>
          </div>

          <div className="mt-5 flex items-center gap-3 sm:mt-0 sm:min-w-[180px] sm:justify-end">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-white/10 text-white">
              <Landmark className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[9px] uppercase tracking-[0.08em] text-[#C7D8CA]">
                Vs mes pasado
              </p>
              <p
                className={
                  profitPositive
                    ? "mt-1 text-[13px] font-bold text-[var(--peek-primary-light)]"
                    : "mt-1 text-[13px] font-bold text-[#FFD4CE]"
                }
              >
                {profitPositive ? "+" : "−"}
                {money.format(Math.abs(visuals.profitChange))}
              </p>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
}
