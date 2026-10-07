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
  const max = Math.max(...visible.map((item) => item.amount), 1);

  return (
    <article className="rounded-[22px] border border-[var(--oe-border)] bg-white p-5">
      <h2 className="text-[15px] font-semibold text-[var(--oe-text)]">
        En qué gastaste
      </h2>
      <p className="mt-1 text-[11px] text-[var(--oe-text-muted)]">
        Tus gastos principales de este mes.
      </p>

      <div className="mt-5 space-y-4">
        {visible.map((item, index) => (
          <div key={item.category}>
            <div className="flex items-center justify-between gap-3">
              <p className="truncate text-[11px] font-semibold text-[#4B5850]">
                {item.label}
              </p>
              <p className="shrink-0 text-[11px] font-bold text-[#2B352F]">
                {money.format(item.amount)}
              </p>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#EEF1EB]">
              <span
                className="peek-money-bar block h-full rounded-full bg-[linear-gradient(90deg,var(--peek-warning)_0%,#E7C65A_100%)]"
                style={{
                  width: `${Math.max(8, (item.amount / max) * 100)}%`,
                  animationDelay: `${index * 90}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
