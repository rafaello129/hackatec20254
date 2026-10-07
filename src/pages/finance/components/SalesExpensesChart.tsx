import SpotlightCard from "@/components/react-bits/SpotlightCard";
import type { MoneyPeriod, SalesExpensePoint } from "@/types/finance.types";

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const compactMoney = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  notation: "compact",
  maximumFractionDigits: 1,
});

const periodOptions: Array<{ value: MoneyPeriod; label: string }> = [
  { value: "week", label: "Semana" },
  { value: "month", label: "Mes" },
  { value: "quarter", label: "3 meses" },
];

interface SalesExpensesChartProps {
  points: SalesExpensePoint[];
  period: MoneyPeriod;
  onPeriodChange: (period: MoneyPeriod) => void;
}

export default function SalesExpensesChart({
  points,
  period,
  onPeriodChange,
}: SalesExpensesChartProps) {
  const maxValue = Math.max(
    ...points.flatMap((point) => [point.sales, point.expenses]),
    1,
  );
  const chartMax =
    maxValue < 1000
      ? Math.ceil(maxValue / 100) * 100
      : Math.ceil((maxValue * 1.15) / 1000) * 1000;

  const totalSales = points.reduce((sum, point) => sum + point.sales, 0);
  const totalExpenses = points.reduce((sum, point) => sum + point.expenses, 0);
  const yTicks = [1, 0.75, 0.5, 0.25, 0].map((ratio) => chartMax * ratio);

  return (
    <SpotlightCard
      spotlightColor="rgba(154, 200, 75, 0.10)"
      className="h-full min-h-[390px] rounded-[24px] border border-[var(--oe-border)] bg-white p-5 sm:p-6"
    >
      <div className="relative z-[4] flex h-full flex-col">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-[17px] font-semibold text-[var(--oe-text)]">
              Ventas y gastos
            </h2>
            <p className="mt-1 text-[11px] text-[var(--oe-text-muted)]">
              Compara lo que entra y sale de tu negocio.
            </p>
          </div>

          <div className="inline-flex w-fit rounded-full bg-[#F3F5F0] p-1">
            {periodOptions.map((option) => {
              const active = period === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onPeriodChange(option.value)}
                  className={
                    active
                      ? "h-8 rounded-full bg-[var(--oe-primary)] px-3 text-[10px] font-semibold text-white"
                      : "h-8 rounded-full px-3 text-[10px] font-semibold text-[#69756D] transition hover:bg-white"
                  }
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px]">
          <span className="inline-flex items-center gap-1.5 font-medium text-[#68746C]">
            <span className="h-2 w-2 rounded-full bg-[var(--oe-primary)]" />
            Ventas
            <strong className="ml-1 text-[#344039]">
              {money.format(totalSales)}
            </strong>
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium text-[#68746C]">
            <span className="h-2 w-2 rounded-full bg-[var(--peek-warning)]" />
            Gastos
            <strong className="ml-1 text-[#344039]">
              {money.format(totalExpenses)}
            </strong>
          </span>
        </div>

        <div
          className="relative mt-5 h-[285px] flex-1 sm:h-[315px]"
          role="img"
          aria-label={`Ventas ${money.format(totalSales)} y gastos ${money.format(totalExpenses)} para el periodo seleccionado`}
        >
          <div className="absolute bottom-7 left-0 right-0 top-0">
            {yTicks.map((tick, index) => (
              <div
                key={tick}
                className="absolute left-0 right-0 flex items-center gap-2"
                style={{ top: `${index * 25}%` }}
              >
                <span className="w-10 shrink-0 text-right text-[9px] font-medium text-[#98A19A]">
                  {compactMoney.format(tick)}
                </span>
                <span className="block flex-1 border-t border-[#EEF1EB]" />
              </div>
            ))}

            <div
              className="absolute bottom-0 left-12 right-0 top-0 grid items-end gap-2 sm:gap-4"
              style={{
                gridTemplateColumns: `repeat(${points.length}, minmax(0, 1fr))`,
              }}
            >
              {points.map((point, index) => (
                <div
                  key={point.label}
                  className="group relative flex h-full min-w-0 items-end justify-center gap-1.5"
                >
                  <div className="pointer-events-none absolute left-1/2 top-2 z-20 hidden w-[158px] -translate-x-1/2 rounded-[12px] border border-[var(--oe-border)] bg-white p-3 text-left shadow-[0_10px_26px_rgba(20,40,24,0.10)] group-hover:block">
                    <p className="text-[10px] font-semibold text-[#263129]">
                      {point.label}
                    </p>
                    <div className="mt-2 space-y-1 text-[9px] text-[#657068]">
                      <p className="flex justify-between gap-3">
                        <span>Ventas</span>
                        <strong>{money.format(point.sales)}</strong>
                      </p>
                      <p className="flex justify-between gap-3">
                        <span>Gastos</span>
                        <strong>{money.format(point.expenses)}</strong>
                      </p>
                      <p className="flex justify-between gap-3 border-t border-[#EEF0EB] pt-1">
                        <span>Te quedó</span>
                        <strong>
                          {money.format(
                            Math.max(0, point.sales - point.expenses),
                          )}
                        </strong>
                      </p>
                    </div>
                  </div>

                  <span
                    title={`Ventas: ${money.format(point.sales)}`}
                    className="peek-money-chart-bar w-[34%] max-w-[30px] rounded-t-[6px] bg-[var(--oe-primary)]"
                    style={{
                      height: `${Math.max(4, (point.sales / chartMax) * 100)}%`,
                      animationDelay: `${index * 70}ms`,
                    }}
                  />
                  <span
                    title={`Gastos: ${money.format(point.expenses)}`}
                    className="peek-money-chart-bar w-[34%] max-w-[30px] rounded-t-[6px] bg-[var(--peek-warning)]"
                    style={{
                      height: `${Math.max(4, (point.expenses / chartMax) * 100)}%`,
                      animationDelay: `${index * 70 + 60}ms`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            className="absolute bottom-0 left-12 right-0 grid gap-2 sm:gap-4"
            style={{
              gridTemplateColumns: `repeat(${points.length}, minmax(0, 1fr))`,
            }}
          >
            {points.map((point) => (
              <p
                key={point.label}
                className="truncate text-center text-[9px] font-semibold text-[#738078] sm:text-[10px]"
              >
                {point.label}
              </p>
            ))}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
