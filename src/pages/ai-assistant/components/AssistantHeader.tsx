import { Bot, Database } from "lucide-react";

export default function AssistantHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--oe-primary)]">
          MÁAK
        </p>
        <h1 className="mt-1 font-['Hanken_Grotesk'] text-[34px] font-bold leading-none text-[var(--oe-text)]">
          Asistente IA
        </h1>
        <p className="mt-2 max-w-2xl text-[13px] leading-5 text-[var(--oe-text-muted)]">
          Copiloto empresarial para analizar clientes, inventario, cooperativos y finanzas.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex h-9 items-center gap-2 rounded-full bg-[var(--peek-success-soft)] px-3 text-[10px] font-semibold text-[var(--oe-primary)]">
          <Bot className="h-3.5 w-3.5" />
          Copiloto empresarial
        </span>
        <span className="inline-flex h-9 items-center rounded-full border border-[var(--oe-border)] bg-white px-3 text-[10px] font-semibold text-[#667169]">
          Modo demo
        </span>
        <span className="inline-flex h-9 items-center gap-2 rounded-full border border-[var(--oe-border)] bg-white px-3 text-[10px] font-semibold text-[#667169]">
          <Database className="h-3.5 w-3.5 text-[var(--oe-primary)]" />
          Datos simulados
        </span>
      </div>
    </header>
  );
}
