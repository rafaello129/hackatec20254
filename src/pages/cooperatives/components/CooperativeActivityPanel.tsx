import type { CooperativeActivity } from "@/types/cooperatives.types";

export default function CooperativeActivityPanel({ activities }: { activities: CooperativeActivity[] }) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <h3 className="mb-3 font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Actividad reciente</h3>
      <ul className="space-y-2">
        {activities.slice(0, 4).map((activity) => (
          <li key={activity.id} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#1a1c18]">{activity.title}</p>
                <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-[#42493f]">{activity.description}</p>
              </div>
              <span className="shrink-0 rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-[#3E5902]">
                {activity.actor}
              </span>
            </div>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#73796e]">{activity.date}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
