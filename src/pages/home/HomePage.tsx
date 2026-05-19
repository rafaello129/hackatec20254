import { ArrowUpRight, BellRing, Bot, Boxes, Handshake, Users } from "lucide-react";
import KpiCard from "@/components/common/KpiCard";
import PageIntro from "@/components/common/PageIntro";
import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";

const activity = [
  { id: 1, title: "Acuerdo logístico aprobado", description: "Cooperativa Norte + Agro Mx · hace 18 min" },
  { id: 2, title: "Alerta de stock crítico", description: "SKU AV-204 en almacén central · hace 42 min" },
  { id: 3, title: "Factura pendiente por validar", description: "INV-2026-0948 · hace 1 hora" },
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Bienvenido de nuevo"
        description="Este panel muestra el estado operativo del ecosistema CRM + Cooperativos para tu equipo."
        actions={
          <>
            <button className="rounded-lg border border-[#c2c9bc] bg-white px-4 py-2 text-sm font-semibold text-[#1a1c18]">
              Últimos 30 días
            </button>
            <button className="rounded-lg bg-[#4F7302] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3E5902]">
              Exportar resumen
            </button>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Clientes activos" value="1,284" hint="+12.5% interanual" icon={<Users className="h-4 w-4 text-[#799833]" />} />
        <KpiCard
          label="Oportunidades cooperativas"
          value="24"
          hint="8 en negociación"
          icon={<Handshake className="h-4 w-4 text-[#799833]" />}
        />
        <KpiCard label="Valor de inventario" value="$428,900" hint="Cobertura de 6.4 semanas" icon={<Boxes className="h-4 w-4 text-[#799833]" />} />
        <KpiCard label="Alertas financieras" value="5" hint="2 requieren atención hoy" icon={<BellRing className="h-4 w-4 text-[#799833]" />} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
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

        <SectionCard
          title="Copiloto IA"
          actions={<StatusBadge label="Conectado" tone="success" />}
        >
          <div className="space-y-3">
            <div className="rounded-lg border border-[#3E5902]/30 bg-[#022601] p-4 text-white">
              <div className="mb-2 flex items-center gap-2">
                <Bot className="h-4 w-4 text-[#D6D979]" />
                <span className="text-sm font-semibold">Sugerencia de negocio</span>
              </div>
              <p className="text-sm text-white/85">
                Detectamos oportunidad de compra conjunta para reducir un 9% el costo de insumos en categoría perecederos.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg bg-[#4F7302] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3E5902]">
              Revisar oportunidad
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
