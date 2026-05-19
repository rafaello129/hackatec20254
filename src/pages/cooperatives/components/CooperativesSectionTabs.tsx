import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/cooperatives", label: "Tablero", end: true },
  { to: "/cooperatives/opportunities", label: "Oportunidades" },
  { to: "/cooperatives/coop-1001", label: "Detalle" },
  { to: "/cooperatives/coop-1001/agreement", label: "Acuerdo" },
];

export default function CooperativesSectionTabs() {
  return (
    <nav className="inline-flex rounded-lg border border-[#c2c9bc] bg-white p-1">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            `rounded-md px-3 py-1.5 text-sm font-semibold transition ${
              isActive ? "bg-[#D6D979] text-[#3E5902]" : "text-[#42493f] hover:bg-[#f3f4ed]"
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
