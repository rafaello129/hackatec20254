import { ArrowDown, ArrowUp, RefreshCw } from "lucide-react";
import type { StockMovement } from "@/types/inventory.types";

const date = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default function ProductMovementTimeline({
  movements,
}: {
  movements: StockMovement[];
}) {
  return (
    <section className="rounded-[24px] border border-[var(--oe-border)] bg-white p-5 sm:p-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#7A867E]">
          Inventario
        </p>
        <h2 className="mt-1 text-[18px] font-semibold text-[#263129]">
          Cambios recientes
        </h2>
      </div>

      <div className="mt-5">
        {movements.length === 0 ? (
          <div className="rounded-[16px] bg-[#F6F8F3] px-4 py-5 text-center text-[11px] text-[#7A867E]">
            Todavía no hay movimientos registrados.
          </div>
        ) : (
          <div className="space-y-0">
            {movements.map((movement, index) => {
              const positive = movement.quantity > 0;
              const Icon =
                movement.type === "ajuste"
                  ? RefreshCw
                  : positive
                    ? ArrowUp
                    : ArrowDown;

              return (
                <div
                  key={movement.id}
                  className="relative flex gap-3 pb-5 last:pb-0"
                >
                  {index < movements.length - 1 ? (
                    <span className="absolute left-[17px] top-9 h-[calc(100%-24px)] w-px bg-[#E5E9E2]" />
                  ) : null}
                  <span
                    className={[
                      "relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full",
                      positive
                        ? "bg-[#EAF4E6] text-[#2E6D36]"
                        : "bg-[#F6F7F3] text-[#68736B]",
                    ].join(" ")}
                  >
                    <Icon className="h-4 w-4" />
                  </span>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="text-[11px] font-semibold text-[#344039]">
                        {positive ? "+" : ""}
                        {movement.quantity} piezas
                      </p>
                      <p className="text-[9px] text-[#8A948D]">
                        {date.format(new Date(movement.date + "T00:00:00"))}
                      </p>
                    </div>
                    <p className="mt-1 text-[10px] leading-4 text-[#738078]">
                      {movement.reason}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
