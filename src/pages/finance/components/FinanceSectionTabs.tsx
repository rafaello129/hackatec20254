import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/finance/summary", label: "Resumen financiero" },
  { to: "/finance/accounting", label: "Contabilidad" },
  { to: "/finance/invoicing", label: "Facturación" },
];

export default function FinanceSectionTabs() {
  return (
    <nav className="inline-flex rounded-lg border border-[#c2c9bc] bg-white p-1">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
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
