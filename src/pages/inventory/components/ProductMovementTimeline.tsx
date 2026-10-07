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
    <section className="h-full rounded-[22px] border border-[var(--oe-border)] bg-white p-4 sm:p-5">
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.09em] text-[#7A867E]">
          Inventario
        </p>
        <h2 className="mt-0.5 text-[16px] font-semibold text-[#263129]">
          Cambios recientes
        </h2>
      </div>

      <div className="mt-4">
        {movements.length === 0 ? (
          <div className="rounded-[14px] bg-[#F6F8F3] px-4 py-4 text-center text-[10px] text-[#7A867E]">
            Todavía no hay movimientos registrados.
          </div>
        ) : (
          <div>
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
                  className="relative flex gap-2.5 pb-3.5 last:pb-0"
                >
                  {index < movements.length - 1 ? (
                    <span className="absolute left-[13px] top-7 h-[calc(100%-14px)] w-px bg-[#E5E9E2]" />
                  ) : null}
                  <span
                    className={[
                      "relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full",
                      positive
                        ? "bg-[#EAF4E6] text-[#2E6D36]"
                        : "bg-[#F6F7F3] text-[#68736B]",
                    ].join(" ")}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="text-[10px] font-semibold text-[#344039]">
                        {positive ? "+" : ""}
                        {movement.quantity} piezas
                      </p>
                      <p className="text-[8px] text-[#8A948D]">
                        {date.format(new Date(movement.date + "T00:00:00"))}
                      </p>
                    </div>
                    <p className="mt-0.5 text-[9px] leading-4 text-[#738078]">
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
