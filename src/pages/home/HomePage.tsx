import { ArrowUpRight, BellRing, Bot, Boxes, Handshake, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";

const inventoryData = [
  { id: 1, product: "Quantum-Core CPU", stock: "42,082 units", status: "Stable", trend: "up" },
  { id: 2, product: "Optical Link Node", stock: "1,240 units", status: "Low Stock", trend: "down" },
  { id: 3, product: "Lithium Array (H2)", stock: "15,900 units", status: "Stable", trend: "right" },
];

const activity = [
  { id: 1, title: "Acuerdo logístico aprobado", description: "Cooperativa Norte + Agro Mx · hace 18 min" },
  { id: 2, title: "Alerta de stock crítico", description: "SKU AV-204 en almacén central · hace 42 min" },
  { id: 3, title: "Factura pendiente por validar", description: "INV-2026-0948 · hace 1 hora" },
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Hanken_Grotesk'] text-3xl font-bold text-[#1a1c18]">Bienvenido de nuevo, Director</h1>
          <p className="text-sm text-[#42493f]">Here's your operational overview for today.</p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg border border-[#c2c9bc] bg-white px-4 py-2 text-sm font-semibold text-[#1a1c18] hover:bg-[#f9faf3]">
            Last 30 Days
          </button>
          <button className="rounded-lg bg-[#4F7302] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3E5902]">
            Export PDF
          </button>
        </div>
      </div>

      {/* KPI Section - Asymmetric Layout */}
      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        {/* Revenue Overview Card */}
        <div className="rounded-lg border border-[#c2c9bc] bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="inline-block rounded-full bg-[#D6D979] px-3 py-1 text-xs font-bold uppercase text-[#022601]">
              Revenue Overview
            </span>
            <span className="text-[#42493f]">...</span>
          </div>
          <p className="font-['Hanken_Grotesk'] text-5xl font-bold text-[#1a1c18]">$1,248,300.00</p>
          <p className="mt-2 flex items-center gap-1 text-sm text-[#4F7302]">
            <TrendingUp className="h-4 w-4" />
            <span>12.4% vs last quarter</span>
          </p>
          {/* Simple Bar Chart Simulation */}
          <div className="mt-6 flex items-end gap-1 h-32">
            {[45, 65, 48, 72, 55, 80, 62].map((height, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-[#D6D979] opacity-60"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        {/* Active Nodes Card - Lime Green */}
        <div className="rounded-lg border border-[#c2c9bc] bg-[#D6D979] p-6 text-[#022601]">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold">Active Nodes</p>
              <p className="text-xs text-[#022601]/70">Infrastructure performance is stable.</p>
            </div>
            <span className="text-lg">✶</span>
          </div>
          <p className="font-['Hanken_Grotesk'] text-5xl font-bold">2,841</p>
          <div className="mt-6 flex text-xs font-semibold uppercase">
            <span className="flex-1">98% Capacity</span>
            <span className="flex-1">4.2ms Latency</span>
          </div>
        </div>
      </div>

      {/* Inventory Status Table */}
      <SectionCard title="Inventory Status" actions={<a href="#" className="text-sm font-semibold text-[#4F7302] hover:text-[#3E5902]">View full List</a>}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e2e3dc] text-xs font-semibold uppercase text-[#42493f]">
                <th className="pb-3 text-left font-semibold">Product Name</th>
                <th className="pb-3 text-left font-semibold">Stock Level</th>
                <th className="pb-3 text-left font-semibold">Status</th>
                <th className="pb-3 text-left font-semibold">Trend</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item) => (
                <tr key={item.id} className="border-b border-[#e2e3dc] hover:bg-[#f9faf3]">
                  <td className="py-3 font-semibold text-[#1a1c18]">{item.product}</td>
                  <td className="py-3 text-[#42493f]">{item.stock}</td>
                  <td className="py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "Stable"
                          ? "bg-[#D6D979] text-[#022601]"
                          : "bg-[#FDD3D3] text-[#8B2E2E]"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3">
                    {item.trend === "up" && <TrendingUp className="h-4 w-4 text-[#4F7302]" />}
                    {item.trend === "down" && <TrendingDown className="h-4 w-4 text-[#8B2E2E]" />}
                    {item.trend === "right" && <ArrowUpRight className="h-4 w-4 text-[#42493f]" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Content Grid: Recent Activity + AI Assistant */}
      <div className="grid gap-4 xl:grid-cols-[1fr_1.2fr]">
        <SectionCard title="Actividad reciente">
          <ul className="space-y-3">
            {activity.map((item) => (
              <li key={item.id} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
                <p className="text-sm font-semibold text-[#1a1c18]">{item.title}</p>
                <p className="text-sm text-[#42493f]">{item.description}</p>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* AI Assistant */}
        <div className="rounded-lg border border-[#c2c9bc] bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">AI Assistant</h2>
            <span className="inline-block rounded-full bg-[#D6D979] px-3 py-1 text-xs font-semibold text-[#022601]">
              Conectado
            </span>
          </div>
          <div className="rounded-lg bg-[#022601] p-4 text-white">
            <div className="mb-3 flex items-start gap-3">
              <Bot className="mt-1 h-5 w-5 flex-shrink-0 text-[#D6D979]" />
              <div>
                <p className="text-sm font-semibold">Sugerencia de negocio</p>
                <p className="mt-2 text-sm text-white/85 leading-relaxed">
                  "Detectamos, based on current burn rates, I recommend restocking Optical Link Nodes within the next 48 hours to avoid shipment delays."
                </p>
              </div>
            </div>
            <div className="mt-4 mb-2">
              <p className="text-xs font-semibold text-white/70 mb-2">¿Would you like me to draft a purchase order for the usual supplier?</p>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="flex-1 rounded-lg bg-[#4F7302] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3E5902]">
              Yes, Draft Order
            </button>
            <button className="flex-1 rounded-lg border border-[#c2c9bc] px-4 py-2 text-sm font-semibold text-[#1a1c18] hover:bg-[#f9faf3]">
              Analyze Trends
            </button>
          </div>
        </div>
      </div>

      {/* Sustainability Banner */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#022601] to-[#0a4a0b] p-8 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2220%22 cy=%2220%22 r=%2220%22 fill=%22%23fff%22 opacity=%220.1%22/><circle cx=%2280%22 cy=%2280%22 r=%2230%22 fill=%22%23fff%22 opacity=%220.1%22/></svg>')]" />
        </div>
        <div className="relative z-10">
          <h3 className="font-['Hanken_Grotesk'] text-2xl font-bold mb-2">Sustainable Growth Strategies</h3>
          <p className="text-sm text-white/90 mb-4 max-w-2xl">
            Explore our 2024 environmental impact reports and operational efficiency targets.
          </p>
          <button className="rounded-lg bg-[#D6D979] px-6 py-2 text-sm font-semibold text-[#022601] hover:bg-[#c9cc6d]">
            Download Reports
          </button>
        </div>
      </div>
    </div>
  );
}
