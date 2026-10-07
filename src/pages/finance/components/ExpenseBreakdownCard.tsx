import type { ExpenseBreakdownItem } from "@/types/finance.types";

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export default function ExpenseBreakdownCard({
  items,
}: {
  items: ExpenseBreakdownItem[];
}) {
  const visible = items.slice(0, 5);
  const total = visible.reduce((sum, item) => sum + item.amount, 0);
  const max = Math.max(...visible.map((item) => item.amount), 1);

  return (
    <article className="h-full min-h-[410px] rounded-[24px] border border-[var(--oe-border)] bg-white p-5 sm:p-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#7A867E]">
          En qué gastaste
        </p>
        <p className="mt-2 font-['Hanken_Grotesk'] text-[30px] font-bold leading-none tracking-[-0.04em] text-[var(--oe-text)]">
          {money.format(total)}
        </p>
        <p className="mt-2 text-[11px] text-[var(--oe-text-muted)]">
          Gastos registrados este mes.
        </p>
      </div>

      <div className="mt-6 space-y-5">
        {visible.map((item, index) => {
          const percentage = total > 0 ? Math.round((item.amount / total) * 100) : 0;
          const width = Math.max(8, (item.amount / max) * 100);

          return (
            <div key={item.category}>
              <div className="flex items-center justify-between gap-3">
                <p className="min-w-0 truncate text-[11px] font-semibold text-[#4B5850]">
                  {item.label}
                </p>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-[9px] font-semibold text-[#9A6A04]">
                    {percentage}%
                  </span>
                  <span className="text-[11px] font-bold text-[#2B352F]">
                    {money.format(item.amount)}
                  </span>
                </div>
              </div>

              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[#F0F1EC]">
                <span
                  className="peek-money-bar block h-full rounded-full bg-[var(--peek-warning)]"
                  style={{
                    width: `${width}%`,
                    animationDelay: `${index * 90}ms`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <div className="mt-6 rounded-[16px] bg-[#F7F9F5] px-4 py-6 text-center text-[11px] text-[#66736A]">
          Aún no has registrado gastos este mes.
        </div>
      ) : (
        <div className="mt-6 rounded-[14px] bg-[var(--peek-warning-soft)] px-3 py-3 text-[10px] leading-4 text-[#715C20]">
          El largo de cada barra muestra qué categorías pesan más en tus gastos.
        </div>
      )}
    </article>
  );
}
