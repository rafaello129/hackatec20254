import { Bot, ChartColumn, Handshake, Layers, MessageSquare, PackageSearch } from "lucide-react";
import PageIntro from "@/components/common/PageIntro";
import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";

const quickActions = [
  { label: "Analizar inventario", icon: PackageSearch },
  { label: "Revisar oportunidades", icon: Handshake },
  { label: "Resumen financiero", icon: ChartColumn },
  { label: "Sugerir campaña", icon: Layers },
];

export default function AIAssistantPage() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Asistente IA"
        description="Copiloto empresarial para análisis operativo y recomendaciones de negocio."
      />

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <SectionCard title="Conversación ejecutiva" actions={<StatusBadge label="Modelo conectado" tone="success" />}>
          <div className="space-y-3">
            <div className="max-w-3xl rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
              <p className="text-sm text-[#1a1c18]">
                Detecté un riesgo de desabasto en categoría perecederos por retraso logístico de 36 horas.
              </p>
            </div>
            <div className="ml-auto max-w-3xl rounded-lg border border-[#D6D979] bg-[#D6D979]/55 p-3">
              <p className="text-sm font-medium text-[#3E5902]">
                Ejecuta simulación de reposición y sugiere proveedores alternos.
              </p>
            </div>
            <div className="max-w-3xl rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
              <p className="text-sm text-[#1a1c18]">
                He calculado un stock-out potencial en 4.2 días. Propongo activar compra cooperativa con dos aliados.
              </p>
            </div>
            <label className="relative block">
              <MessageSquare className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#42493f]" />
              <input
                type="text"
                placeholder="Escribe una instrucción para el asistente..."
                className="h-11 w-full rounded-lg border border-[#c2c9bc] bg-white pl-9 pr-3 text-sm outline-none focus:border-[#4F7302] focus:ring-2 focus:ring-[#4F7302]/20"
              />
            </label>
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Recomendaciones">
            <div className="space-y-3 text-sm">
              <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
                <p className="font-semibold text-[#1a1c18]">Riesgo: cadena de suministro</p>
                <p className="text-[#42493f]">14 envíos impactados en corredor centro-occidente.</p>
              </div>
              <div className="rounded-lg border border-[#ffdad6] bg-[#ffdad6]/60 p-3">
                <p className="font-semibold text-[#93000a]">Acción recomendada</p>
                <p className="text-[#93000a]">Priorizar inventario crítico y proveedores con SLA alto.</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Quick actions">
            <div className="grid gap-2">
              {quickActions.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#c2c9bc] bg-white px-3 py-2 text-left text-sm font-semibold text-[#1a1c18] hover:bg-[#f3f4ed]"
                >
                  <Icon className="h-4 w-4 text-[#4F7302]" />
                  {label}
                </button>
              ))}
            </div>
          </SectionCard>

          <div className="rounded-lg border border-[#3E5902] bg-[#022601] p-4 text-white">
            <div className="mb-2 flex items-center gap-2">
              <Bot className="h-4 w-4 text-[#D6D979]" />
              <p className="text-sm font-semibold">Copiloto listo</p>
            </div>
            <p className="text-sm text-white/85">El módulo está preparado para conectar motor IA en Fase 6.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
