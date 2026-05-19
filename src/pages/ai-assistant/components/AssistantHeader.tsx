import { Bot } from "lucide-react";
import PageIntro from "@/components/common/PageIntro";
import StatusBadge from "@/components/common/StatusBadge";

export default function AssistantHeader() {
  return (
    <PageIntro
      title="Asistente IA"
      description="Copiloto empresarial para leer senales de clientes, inventario, cooperativos y finanzas con respuestas simuladas."
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge label="Copiloto empresarial" tone="success" />
          <span className="inline-flex items-center gap-2 rounded-lg border border-[#c2c9bc] bg-white px-3 py-2 text-sm font-semibold text-[#42493f]">
            <Bot className="h-4 w-4 text-[#4F7302]" />
            Modo demo
          </span>
        </div>
      }
    />
  );
}
