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
    <section className="rounded-[22px] border border-[var(--oe-border)] bg-white p-4 sm:p-5">
      <p className="text-[9px] font-semibold uppercase tracking-[0.09em] text-[#7A867E]">
        Historial de verificación
      </p>
      <h3 className="mt-0.5 text-[16px] font-semibold text-[#263129]">
        Progreso de la revisión
      </h3>

      <ol className="mt-4">
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
            <li key={event.id} className="relative flex gap-2.5 pb-3.5 last:pb-0">
              {index < timeline.length - 1 ? (
                <span className="absolute left-[13px] top-7 h-[calc(100%-14px)] w-px bg-[#E3E8DF]" />
              ) : null}
              <span
                className={[
                  "relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full",
                  circle,
                ].join(" ")}
              >
                <Icon className="h-3 w-3" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-1.5">
                  <p className="text-[10px] font-semibold text-[#344039]">
                    {event.label}
                  </p>
                  {event.date ? (
                    <span className="text-[8px] text-[#8A948D]">
                      {date.format(new Date(event.date + "T00:00:00"))}
                    </span>
                  ) : null}
                </div>
                {event.description ? (
                  <p className="mt-0.5 text-[8px] leading-4 text-[#7A867E]">
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
