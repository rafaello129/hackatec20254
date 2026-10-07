import { CalendarDays, Handshake } from "lucide-react";
import type { CooperativeActivity } from "@/types/cooperatives.types";

export default function CooperativeActivityPanel({ activities }: { activities: CooperativeActivity[] }) {
  return (
    <section className="rounded-[24px] border border-[#E2E6DF] bg-white p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-[#17231B]">Actividad reciente</h2>
          <p className="mt-1 text-[11px] text-[#87918A]">Últimos movimientos de la red cooperativa</p>
        </div>
        <span className="rounded-full bg-[#F5F7F2] px-2.5 py-1 text-[10px] font-medium text-[#7A857E]">En tiempo real</span>
      </div>

      <div className="mt-5 grid gap-x-8 md:grid-cols-2">
        {activities.slice(0, 4).map((activity) => (
          <article key={activity.id} className="flex items-center gap-3 border-b border-[#EEF0EB] py-3.5 first:pt-0">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#EDF4E8] text-[#2E7439]">
              <Handshake className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-[#344039]">{activity.title}</p>
              <p className="mt-0.5 line-clamp-1 text-[11px] text-[#838C86]">{activity.description}</p>
              <p className="mt-1 text-[10px] font-medium text-[#607064]">{activity.actor}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 text-[10px] text-[#919A94]">
              <CalendarDays className="h-3 w-3" />
              {activity.date}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
