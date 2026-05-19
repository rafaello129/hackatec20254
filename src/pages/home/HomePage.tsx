import { ArrowUpRight, TrendingUp, TrendingDown, Package, BarChart3, Zap } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";

const inventoryData = [
  { id: 1, product: "Jeans Premium", stock: "450 unidades", status: "Estable", trend: "up" },
  { id: 2, product: "Camisetas Algodón Orgánico", stock: "128 unidades", status: "Stock Bajo", trend: "down" },
  { id: 3, product: "Chaquetas Lana", stock: "89 unidades", status: "Estable", trend: "right" },
];

export default function HomePage() {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="font-['Hanken_Grotesk'] text-3xl font-bold text-[#1a1c18]">Bienvenido, Gerente de Tienda</h1>
          <p className="text-sm text-[#42493f] mt-1">Aquí está tu resumen de rendimiento minorista de hoy.</p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg border border-[#c2c9bc] bg-white px-4 py-2 text-sm font-semibold text-[#1a1c18] hover:bg-[#f3f4ed] transition-colors">
            Últimos 30 días
          </button>
          <button className="rounded-lg bg-[#4F7302] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3E5902] transition-colors">
            Exportar Reporte
          </button>
        </div>
      </div>

      {/* KPI Section - Asymmetric Layout */}
      <div className="grid gap-3 xl:grid-cols-[1.5fr_1fr]">
        {/* Revenue Overview Card */}
        <div className="rounded-lg border border-[#c2c9bc] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="inline-block rounded-md bg-[#CBDC57] px-3 py-1 text-xs font-bold uppercase text-[#022601]">
              Ingresos Semanales
            </span>
            <BarChart3 className="h-5 w-5 text-[#42493f]" />
          </div>
          <p className="font-['Hanken_Grotesk'] text-4xl font-bold text-[#1a1c18]">$18,450.00</p>
          <p className="mt-2 flex items-center gap-2 text-sm text-[#4F7302]">
            <TrendingUp className="h-4 w-4" />
            <span>8.2% vs semana anterior</span>
          </p>
          {/* Simple Bar Chart Simulation */}
          <div className="mt-4 flex items-end gap-2 h-20">
            {[
              { h: 45, color: "#D6D979" },
              { h: 65, color: "#D6D979" },
              { h: 48, color: "#D6D979" },
              { h: 72, color: "#D6D979" },
              { h: 55, color: "#D6D979" },
              { h: 80, color: "#4F7302" },
              { h: 62, color: "#D6D979" },
            ].map((bar, i) => (
              <div
                key={i}
                className="flex-1 rounded-md transition-colors hover:opacity-80"
                style={{ height: `${bar.h}%`, backgroundColor: bar.color }}
              />
            ))}
          </div>
        </div>

        {/* Active Orders Card */}
        <div className="rounded-lg bg-[#CCEF8B] p-4 text-[#2b4f23] shadow-lg">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold opacity-90">Órdenes Pendientes</p>
              <p className="text-xs opacity-75 mt-0.5">Órdenes en espera de envío.</p>
            </div>
            <div className="bg-[#4c6f00]/20 rounded-lg p-2">
              <Package className="h-4 w-4 text-[#2b4f23]" />
            </div>
          </div>
          <p className="font-['Hanken_Grotesk'] text-5xl font-bold text-[#2b4f23]">127</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="bg-[#aad462] rounded-lg p-2 border border-[#4c6f00]/20">
              <p className="text-xs font-bold uppercase opacity-75 mb-0.5 text-[#2b4f23]">Express</p>
              <p className="text-lg font-bold text-[#2b4f23]">34</p>
            </div>
            <div className="bg-[#aad462] rounded-lg p-2 border border-[#4c6f00]/20">
              <p className="text-xs font-bold uppercase opacity-75 mb-0.5 text-[#2b4f23]">Promedio</p>
              <p className="text-lg font-bold text-[#2b4f23]">18h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Status + AI Assistant Grid */}
      <div className="grid gap-3 xl:grid-cols-[1.5fr_1.2fr]">
        {/* Inventory Status Table */}
        <SectionCard title="Estado de Inventario" actions={<a href="#" className="text-sm font-semibold text-[#4F7302] hover:text-[#3E5902]">Ver todo</a>}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e2e3dc] text-xs font-semibold uppercase text-[#42493f] bg-[#f3f4ed]">
                  <th className="px-3 py-2 text-left font-semibold">Producto</th>
                  <th className="px-3 py-2 text-left font-semibold">Stock</th>
                  <th className="px-3 py-2 text-left font-semibold">Estado</th>
                  <th className="px-3 py-2 text-left font-semibold">Tendencia</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((item) => (
                  <tr key={item.id} className="border-b border-[#e2e3dc] hover:bg-[#f3f4ed] transition-colors">
                    <td className="px-3 py-2 font-semibold text-xs text-[#1a1c18]">{item.product}</td>
                    <td className="px-3 py-2 text-xs text-[#42493f]">{item.stock}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${
                          item.status === "Estable"
                            ? "bg-[#CBDC57] text-[#022601]"
                            : "bg-[#FFD6D6] text-[#8B2E2E]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      {item.trend === "up" && <TrendingUp className="h-3 w-3 text-[#4F7302]" />}
                      {item.trend === "down" && <TrendingDown className="h-3 w-3 text-[#8B2E2E]" />}
                      {item.trend === "right" && <ArrowUpRight className="h-3 w-3 text-[#42493f]" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Insights Assistant */}
        <div className="rounded-lg bg-[#162300] p-6 text-white shadow-lg">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="font-['Hanken_Grotesk'] text-lg font-bold">Insights de IA</h2>
              <p className="text-xs opacity-85 mt-0.5">Recomendaciones basadas en datos</p>
            </div>
            <div className="rounded-lg bg-[#c5f17a]/20 p-2 border border-[#c5f17a]/30">
              <Zap className="h-4 w-4 text-[#c5f17a]" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="rounded-lg bg-white/10 border border-[#c5f17a]/30 p-3">
              <p className="text-xs leading-relaxed text-white">
                Basándome en patrones de demanda, recomiendo <span className="font-semibold text-[#c5f17a]">reabastecer Camisetas de Algodón Orgánico</span> en las próximas 48 horas.
              </p>
              <p className="text-xs opacity-75 mt-1">Tienen <span className="font-semibold">+12% de interés</span> esta semana</p>
            </div>

            <div className="flex gap-2 pt-1">
              <button className="flex-1 rounded-lg bg-[#c5f17a] px-3 py-1.5 text-xs font-semibold text-[#162300] hover:bg-[#aad462] transition-colors">
                Crear Orden
              </button>
              <button className="flex-1 rounded-lg border border-[#c5f17a]/40 px-3 py-1.5 text-xs font-semibold text-[#c5f17a] hover:bg-[#c5f17a]/10 transition-colors">
                Ver Análisis
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Banner */}
      <div className="relative overflow-hidden rounded-lg min-h-[250px] text-white shadow-lg">
        <img
          src="/home.png"
          alt="Colección Primavera"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#022601]/58" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,38,1,0.78)_0%,rgba(2,38,1,0.32)_52%,rgba(2,38,1,0.1)_100%)]" />
        <div className="relative z-10 flex h-full min-h-[250px] items-center px-6 py-5 sm:px-8">
          <div className="max-w-xl">
            <h3 className="font-['Hanken_Grotesk'] text-[26px] font-bold leading-8 mb-3">
              Colección Primavera
            </h3>
            <p className="max-w-md text-sm leading-6 text-white/88 mb-5">
              Descubre nuestras nuevas líneas sostenibles. Explora estilos tendencia y colecciones exclusivas.
            </p>
            <button className="rounded-lg bg-[#c5f17a] px-5 py-2.5 text-sm font-semibold text-[#022601] hover:bg-[#aad462] transition-colors">
              Ver Colecciones
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
