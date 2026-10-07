import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import type {
  MoneyMovement,
  MoneyMovementFilter,
} from "@/types/finance.types";

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const filters: Array<{ value: MoneyMovementFilter; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "income", label: "Entradas" },
  { value: "expense", label: "Salidas" },
];

const displayDate = (dateISO: string, referenceDate: string) => {
  if (dateISO === referenceDate) return "Hoy";

  const current = new Date(`${referenceDate}T00:00:00`);
  const date = new Date(`${dateISO}T00:00:00`);
  const diff = Math.round(
    (current.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diff === 1) return "Ayer";

  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "short",
  }).format(date);
};

interface MoneyMovementListProps {
  movements: MoneyMovement[];
  filter: MoneyMovementFilter;
  onFilterChange: (filter: MoneyMovementFilter) => void;
}

export default function MoneyMovementList({
  movements,
  filter,
  onFilterChange,
}: MoneyMovementListProps) {
  const referenceDate =
    movements
      .map((movement) => movement.date)
      .sort((a, b) => b.localeCompare(a))[0] ?? "";

  const visible = movements.slice(0, 7);

  return (
    <article className="h-full min-h-[410px] rounded-[24px] border border-[var(--oe-border)] bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-[17px] font-semibold text-[var(--oe-text)]">
            Movimientos recientes
          </h2>
          <p className="mt-1 text-[11px] text-[var(--oe-text-muted)]">
            Ventas y gastos registrados en tu negocio.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((option) => {
            const active = filter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => onFilterChange(option.value)}
                className={
                  active
                    ? "h-8 rounded-full bg-[var(--oe-primary)] px-3.5 text-[10px] font-semibold text-white"
                    : "h-8 rounded-full border border-[var(--oe-border)] bg-white px-3.5 text-[10px] font-semibold text-[#657068] transition hover:bg-[#F7F9F5]"
                }
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="mt-5 rounded-[16px] bg-[#F7F9F5] px-4 py-10 text-center">
          <p className="text-[11px] font-semibold text-[#4A574F]">
            Todavía no hay movimientos en esta categoría.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-5 hidden overflow-hidden rounded-[18px] border border-[var(--oe-border)] md:block">
            <table className="w-full table-fixed text-left">
              <thead className="bg-[#F6F8F3]">
                <tr className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#7A867E]">
                  <th className="w-[62%] px-4 py-3">Movimiento</th>
                  <th className="w-[18%] px-3 py-3">Fecha</th>
                  <th className="w-[20%] px-4 py-3 text-right">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((movement, index) => {
                  const income = movement.type === "income";
                  const Icon = income ? ArrowUpRight : ArrowDownLeft;

                  return (
                    <tr
                      key={movement.id}
                      className="peek-money-movement group border-t border-[#EEF0EB] transition-colors duration-200 hover:bg-[#F7FAF5]"
                      style={{
                        animationDelay: `${Math.min(index, 6) * 55}ms`,
                      }}
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex min-w-0 items-center gap-3">
                          <span
                            className={
                              income
                                ? "grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-[var(--peek-success-soft)] text-[var(--peek-success)]"
                                : "grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-[var(--peek-warning-soft)] text-[#946500]"
                            }
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-[11px] font-semibold text-[#2B352F]">
                              {movement.description}
                            </span>
                            <span className="mt-0.5 block truncate text-[10px] text-[#849087]">
                              {movement.detail ||
                                (income
                                  ? "Entrada de dinero"
                                  : "Gasto del negocio")}
                            </span>
                          </span>
                        </div>
                      </td>

                      <td className="px-3 py-3.5 text-[10px] font-medium text-[#77827A]">
                        {displayDate(movement.date, referenceDate)}
                      </td>

                      <td
                        className={
                          income
                            ? "px-4 py-3.5 text-right text-[12px] font-bold text-[var(--peek-success)]"
                            : "px-4 py-3.5 text-right text-[12px] font-bold text-[#946500]"
                        }
                      >
                        {income ? "+" : "−"}
                        {money.format(movement.amount)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-5 divide-y divide-[#EEF0EB] md:hidden">
            {visible.map((movement, index) => {
              const income = movement.type === "income";
              const Icon = income ? ArrowUpRight : ArrowDownLeft;

              return (
                <div
                  key={movement.id}
                  className="peek-money-movement flex items-center gap-3 py-3.5 first:pt-0 last:pb-0"
                  style={{
                    animationDelay: `${Math.min(index, 6) * 55}ms`,
                  }}
                >
                  <span
                    className={
                      income
                        ? "grid h-10 w-10 shrink-0 place-items-center rounded-[13px] bg-[var(--peek-success-soft)] text-[var(--peek-success)]"
                        : "grid h-10 w-10 shrink-0 place-items-center rounded-[13px] bg-[var(--peek-warning-soft)] text-[#946500]"
                    }
                  >
                    <Icon className="h-4 w-4" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 items-center gap-2">
                      <p className="truncate text-[11px] font-semibold text-[#2B352F]">
                        {movement.description}
                      </p>
                      <span className="shrink-0 text-[9px] text-[#929B94]">
                        {displayDate(movement.date, referenceDate)}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-[10px] text-[#849087]">
                      {movement.detail ||
                        (income ? "Entrada de dinero" : "Gasto del negocio")}
                    </p>
                  </div>

                  <p
                    className={
                      income
                        ? "shrink-0 text-[12px] font-bold text-[var(--peek-success)]"
                        : "shrink-0 text-[12px] font-bold text-[#946500]"
                    }
                  >
                    {income ? "+" : "−"}
                    {money.format(movement.amount)}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </article>
  );
}
