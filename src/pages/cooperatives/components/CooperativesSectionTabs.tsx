import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/cooperatives", label: "Tablero", end: true },
  { to: "/cooperatives/opportunities", label: "Oportunidades" },
  { to: "/cooperatives/coop-1001", label: "Detalle" },
  { to: "/cooperatives/coop-1001/agreement", label: "Acuerdo" },
];

export default function CooperativesSectionTabs() {
  return (
    <nav className="inline-flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-[14px] border border-[#E1E6DE] bg-[#F7F8F5] p-1" aria-label="Secciones de cooperativas">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            isActive
              ? "inline-flex h-8 shrink-0 items-center rounded-[10px] bg-[#135C2F] px-3.5 text-[11px] font-semibold text-white shadow-sm transition-all"
              : "inline-flex h-8 shrink-0 items-center rounded-[10px] px-3.5 text-[11px] font-medium text-[#657168] transition-all hover:bg-white hover:text-[#2F4937]"
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
