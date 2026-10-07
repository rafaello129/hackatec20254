import SpotlightCard from "@/components/react-bits/SpotlightCard";
import type { MoneyPeriod, SalesExpensePoint } from "@/types/finance.types";

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
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

  const totalSales = points.reduce((sum, point) => sum + point.sales, 0);
  const totalExpenses = points.reduce((sum, point) => sum + point.expenses, 0);

  return (
    <SpotlightCard
      spotlightColor="rgba(154, 200, 75, 0.12)"
      className="rounded-[24px] border border-[var(--oe-border)] bg-white p-5 sm:p-6"
    >
      <div className="relative z-[4]">
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
                      ? "h-8 rounded-full bg-[var(--oe-primary)] px-3 text-[10px] font-semibold text-white shadow-sm"
                      : "h-8 rounded-full px-3 text-[10px] font-semibold text-[#69756D] transition hover:bg-white"
                  }
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:max-w-[360px]">
          <div className="rounded-[16px] bg-[#F3F8EF] px-4 py-3">
            <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#708078]">
              Ventas
            </p>
            <p className="mt-1 text-[16px] font-bold text-[var(--oe-primary)]">
              {money.format(totalSales)}
            </p>
          </div>
          <div className="rounded-[16px] bg-[var(--peek-warning-soft)] px-4 py-3">
            <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#806D3A]">
              Gastos
            </p>
            <p className="mt-1 text-[16px] font-bold text-[#9A6A04]">
              {money.format(totalExpenses)}
            </p>
          </div>
        </div>

        <div
          className="mt-6 grid h-[255px] items-end gap-3 sm:gap-4"
          style={{
            gridTemplateColumns: `repeat(${points.length}, minmax(0, 1fr))`,
          }}
          role="img"
          aria-label={`Ventas ${money.format(totalSales)} y gastos ${money.format(totalExpenses)} para el periodo seleccionado`}
        >
          {points.map((point, index) => (
            <div
              key={point.label}
              className="flex h-full min-w-0 flex-col justify-end"
            >
              <div className="group relative flex flex-1 items-end justify-center gap-1.5 rounded-[14px] bg-[#FAFBF8] px-1.5 pb-3 pt-4">
                <div className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-10 hidden w-[148px] -translate-x-1/2 rounded-[12px] border border-[#DDE4DA] bg-white p-3 text-left shadow-[0_10px_26px_rgba(20,40,24,0.12)] group-hover:block">
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
                      <strong>{money.format(Math.max(0, point.sales - point.expenses))}</strong>
                    </p>
                  </div>
                </div>

                <span
                  title={`Ventas: ${money.format(point.sales)}`}
                  className="peek-money-chart-bar w-[36%] max-w-[24px] rounded-t-[6px] bg-[var(--oe-primary)]"
                  style={{
                    height: `${Math.max(8, (point.sales / maxValue) * 100)}%`,
                    animationDelay: `${index * 70}ms`,
                  }}
                />
                <span
                  title={`Gastos: ${money.format(point.expenses)}`}
                  className="peek-money-chart-bar w-[36%] max-w-[24px] rounded-t-[6px] bg-[var(--peek-warning)]"
                  style={{
                    height: `${Math.max(8, (point.expenses / maxValue) * 100)}%`,
                    animationDelay: `${index * 70 + 60}ms`,
                  }}
                />
              </div>
              <p className="mt-2 truncate text-center text-[10px] font-semibold text-[#738078]">
                {point.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4 text-[10px] font-medium text-[#68746C]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--oe-primary)]" />
            Ventas
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--peek-warning)]" />
            Gastos
          </span>
        </div>
      </div>
    </SpotlightCard>
  );
}
