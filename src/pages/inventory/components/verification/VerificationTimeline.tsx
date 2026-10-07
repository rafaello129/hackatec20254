import { Check, Circle, LoaderCircle } from "lucide-react";
import type { ProductVerificationEvent } from "@/types/product-verification.types";

const date = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default function VerificationTimeline({
  timeline,
}: {
  timeline: ProductVerificationEvent[];
}) {
  if (timeline.length === 0) return null;

  return (
    <section className="rounded-[24px] border border-[var(--oe-border)] bg-white p-5 sm:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#7A867E]">
        Historial de verificación
      </p>
      <h3 className="mt-1 text-[17px] font-semibold text-[#263129]">
        Progreso de la revisión
      </h3>

      <ol className="mt-5">
        {timeline.map((event, index) => {
          const Icon =
            event.status === "complete"
              ? Check
              : event.status === "current"
                ? LoaderCircle
                : Circle;
          const circle =
            event.status === "complete"
              ? "bg-[#2F873A] text-white"
              : event.status === "current"
                ? "bg-[#FFF4D8] text-[#8B6205]"
                : "bg-[#F1F3EF] text-[#9AA39C]";

          return (
            <li key={event.id} className="relative flex gap-3 pb-5 last:pb-0">
              {index < timeline.length - 1 ? (
                <span className="absolute left-[15px] top-8 h-[calc(100%-20px)] w-px bg-[#E3E8DF]" />
              ) : null}
              <span className={["relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full", circle].join(" ")}>
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[11px] font-semibold text-[#344039]">
                    {event.label}
                  </p>
                  {event.date ? (
                    <span className="text-[9px] text-[#8A948D]">
                      {date.format(new Date(event.date + "T00:00:00"))}
                    </span>
                  ) : null}
                </div>
                {event.description ? (
                  <p className="mt-1 text-[10px] leading-4 text-[#7A867E]">
                    {event.description}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
