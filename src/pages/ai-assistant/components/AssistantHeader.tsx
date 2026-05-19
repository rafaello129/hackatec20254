import { Bot, Database } from "lucide-react";

export default function AssistantHeader() {
  return (
    <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
      <div className="min-w-0">
        <h1 className="font-['Hanken_Grotesk'] text-3xl font-bold text-[#1a1c18]">Asistente IA</h1>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-[#42493f]">
          Copiloto empresarial para analizar clientes, inventario, cooperativos y finanzas.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#D6D979] bg-[#f4f6d6] px-3 py-1.5 text-xs font-semibold text-[#3E5902]">
          <Bot className="h-3.5 w-3.5" />
          Copiloto empresarial
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#c2c9bc] bg-white px-3 py-1.5 text-xs font-semibold text-[#42493f]">
          Modo demo
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#c2c9bc] bg-white px-3 py-1.5 text-xs font-semibold text-[#42493f]">
          <Database className="h-3.5 w-3.5 text-[#4F7302]" />
          Datos simulados
        </span>
      </div>
    </header>
  );
}
