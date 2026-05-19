import type { CooperativeActivity } from "@/types/cooperatives.types";

export default function CooperativeActivityPanel({ activities }: { activities: CooperativeActivity[] }) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <h3 className="mb-3 font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Actividad reciente</h3>
      <ul className="space-y-2.5">
        {activities.map((activity) => (
          <li key={activity.id} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
            <p className="text-sm font-semibold text-[#1a1c18]">{activity.title}</p>
            <p className="text-sm text-[#42493f]">{activity.description}</p>
            <p className="mt-1 text-xs text-[#42493f]">{activity.date} · {activity.actor}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
