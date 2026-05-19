import { MoreVertical, UserPlus, Users } from "lucide-react";
import type { TeamMember, TeamRole } from "@/types/settings.types";

const roleLabels: Record<TeamRole, string> = {
  owner: "OWNER",
  admin: "ADMIN",
  editor: "EDITOR",
  viewer: "VIEWER",
};

const roleStyles: Record<TeamRole, string> = {
  owner: "bg-[#D6D979] text-[#3E5902]",
  admin: "bg-[#e2e3dc] text-[#42493f]",
  editor: "bg-[#eef3d3] text-[#3E5902]",
  viewer: "bg-[#f3f4ed] text-[#42493f]",
};

export default function TeamAccessCard({ members }: { members: TeamMember[] }) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#eef3d3] text-[#4F7302]">
            <Users className="h-4 w-4" />
          </span>
          <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Acceso del equipo</h2>
        </div>
        <button type="button" disabled className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4F7302] opacity-80">
          <UserPlus className="h-4 w-4" />
          Invitar
        </button>
      </div>

      <div className="space-y-3">
        {members.map((member) => (
          <article
            key={member.id}
            className="flex min-w-0 items-center gap-3 rounded-lg border border-[#e8e9e2] bg-[#f9faf3] px-3 py-3"
          >
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#c2c9bc] bg-[#D6D979]">
              {member.avatarUrl ? (
                <img src={member.avatarUrl} alt={member.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs font-bold text-[#3E5902]">
                  {member.name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#1a1c18]">{member.name}</p>
              <p className="truncate text-xs text-[#42493f]">{member.email}</p>
            </div>
            <span className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-bold ${roleStyles[member.role]}`}>
              {roleLabels[member.role]}
            </span>
            <button
              type="button"
              disabled
              aria-label={`Opciones de ${member.name}`}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#42493f] opacity-75"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
